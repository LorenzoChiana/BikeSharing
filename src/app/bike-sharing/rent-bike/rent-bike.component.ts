import { Component, OnInit, Inject, Injectable, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MouseEvent } from '@agm/core';

import { RackService } from '../services/rack.service';
import { BikeService } from '../services/bike.service';
import { RentService } from '../services/rent.service';
import { CommentService } from '../services/comment.service';

import { Bike, Rent, Rack, Comment } from '../structDb';

import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';

import { angularMath } from 'angular-ts-math';

export interface DialogData {
  rent: Rent;
  bike: Bike;
  distRack: number;
}

export class RentContent {
  mode: string;
  rent: Rent;
  bike: Bike;
  distRack: number;

  constructor(mode: string, rent: Rent, bike: Bike, distRack: number) {
                this.mode = mode;
                this.rent = rent;
                this.bike = bike;
                this.distRack = distRack;
              }
}

export interface DialogDataComment {
  rent: Rent;
  comment: Comment;
}

export class CommentContent {
  mode: string;
  rent: Rent;
  comment: Comment;

  constructor(mode: string, comment: Comment) {
                this.mode = mode;
                this.comment = comment;
              }
}

@Component({
  selector: 'app-detail',
  templateUrl: './rent-bike.component.html',
  styleUrls: ['../view/view.component.css'] // prova a dare css
  //styleUrls: ['./rent-bike.component.css']
})
export class RentBikeComponent implements OnInit {
  private nameUser: string;
  private isAdmin: boolean;

  private racks: Rack[];

  private bikeRack: Bike[];
  private bikeUser: Bike[];
  private rents: Rent[];

  private curRack: Rack;
  private curBike: Bike;
  private curRent: Rent;
  private curComment: Comment;

  private secondiMinuto: number = 1; // 60

  // Centro di Cesena
  private latitudine: number = 44.144207;
  private longitudine: number = 12.231784;

  private zoom: number = 15;
  private showMap: boolean = true;

  private deltaX: number = 0.0001;

  // queste 2 opzioni forse non servono
  private currentLat : number;
  private currentLong : number;

  private codeRack: string;

  private distRack: number;
  private distMin: number = 100; // Distanza minima x riposizionamento bici

  private costoOra: number = 0.50; // costo orario

  private errorMessage;

  private Math: any;

  labelOptions = {
    color: '#FFFFFF',
    fontFamily: '',
    fontSize: '14px',
    fontWeight: 'bold',
    text: 'Bici',
  }

    constructor(
      private router: Router,
      private route: ActivatedRoute,

      private rackService :RackService,
      private bikeService :BikeService,
      private rentService: RentService,
      private commentService: CommentService,

      private location: Location,
      public dialog: MatDialog,) {
        this.Math = Math;
      }

    ngOnInit() {
      this.nameUser = localStorage.getItem('login');
      this.isAdmin = (localStorage.getItem('isAdmin') == 'true');

      this.curRack = new Rack(0, '', 0, 0, '', 0, 0); // rack nullo

      this.route.params.subscribe((params) => {

        var idRack :number = params.idRack;
        this.rackService.getRack(idRack).subscribe(data => {
          this.curRack = data;
          this.latitudine = this.curRack.latitudine;
          this.longitudine = this.curRack.longitudine;

          this.ricaricaBici();
        });

        this.rackService.getAllRack().subscribe(data => {
          this.racks = data;
        });

        /* modello promise
        this.rackService.getRack(idRack).then(res => {
          this.rack = res.json();
        });
        */
      });
    }

    toggleMap() : void {
      this.showMap = !this.showMap;
    }

    home() : void {
      this.router.navigate(['view']);
    }

    goBack(): void {
        this.location.back();
    }

    commentiBike(bike: Bike) : void {
      this.router.navigate(['view-comment', bike.codice]);
    }

    ricaricaBici() : void {
      if  (this.isAdmin == true) {
        this.bikeService.getAllBike().subscribe((data) => { this.bikeRack = data; });
      } else {
        this.bikeService.getUserBike(this.nameUser).subscribe((data) => {
          this.bikeUser = data;

          this.bikeService.getRackBike(this.curRack.codice).subscribe((data) => {
            this.bikeRack = data;
            this.shiftRackBike();
          });
        });
      }
    }

    dragBike(event, bike): void {
        var lat : number = event.coords.lat;
        var lng : number = event.coords.lng;

        var metri : number = this.distanza(lat, lng, bike.latitudine, bike.longitudine);

        bike.latitudine = lat;
        bike.longitudine = lng;

        metri = (bike.totKm * 1000) + metri ;
        var km : number = metri /  1000.0;

        km = this.round(km, 3);
        bike.totKm = km;
        bike.mode = "update";

        this.bikeService.updateBike(bike).subscribe(data => {}, error => this.errorMessage = error)
    }

    round(numero : number, precision : number): number {
    	var factor = this.Math.pow(10, precision);
    	var temp = numero * factor;
    	var roundedTemp = this.Math.round(temp);
    	return roundedTemp / factor;
    }

    selectBike(bike : Bike, mode: number): void {
      this.curBike = bike; // memorizzo bike corrente
      if (this.isAdmin) {
        this.router.navigate(['edit-bike', bike._id]);
      } else {
        if (mode == 0) { // selezione bici libera
          this.curBike = bike; // memorizzo bike corrente
          this.rentDialog(bike);
        } else { // selezione bici in uso utente
          this.curBike = bike; // memorizzo bike corrente
          this.releaseDialog(bike);
        }
      }
    }

    selectRack(rack : Rack): void {
        this.curRack = rack; // cambio rack corrente
        this.ricaricaBici();
    }

    rentDialog(bike : Bike) : void {
      this.curBike = bike;

      var now: Date = new Date();
      var todayString: string = now.toDateString();

      var timeInit: string = now.getHours() + ":" + now.getMinutes();
      var timeEnd: string = "";
      var tempo: number = 0;
      var costo: number = 0;

      this.curRent = new Rent(0, todayString, this.nameUser, this.curBike.codice,
                              timeInit, timeEnd, tempo, costo);

      var rentContent: RentContent = new RentContent("rent",
                                                      this.curRent, this.curBike, this.distRack);
      this.openDialog(rentContent, this.bikeService, this.rentService, this.rackService);
    }

    releaseDialog(bike: Bike) : void {
        var nearRack : Rack = this.nearRack(bike); // ricerca rack più vicino
        this.curRack = nearRack;
        this.curBike = bike;

        this.rentService.getBikeRent(this.nameUser, this.curBike.codice, "").subscribe((data) => {
          this.rents = data;
          this.curRent = this.rents[0];

          var now: Date = new Date();
          this.curRent.timeEnd = now.getHours() + ":" + now.getMinutes();

          var oldDate : Date = new Date();
          var t1 = this.curRent.timeInit.split(":");
          oldDate.setHours(parseInt(t1[0]));
          oldDate.setMinutes(parseInt(t1[1]));
          oldDate.setSeconds(0);

          var diffTempo: number = (now.valueOf() - oldDate.valueOf());
          var tempo: number = diffTempo / (1000.0 * this.secondiMinuto);
          var costo: number = tempo * this.costoOra / 60.0;

          this.curRent.tempo = this.Math.round(tempo * 100)/100; // messo x dare valore
          this.curRent.costo = this.Math.round(costo * 100)/100;

          var rentContent: RentContent = new RentContent("release",
                                                      this.curRent, this.curBike, this.distRack);

          this.openDialog(rentContent, this.bikeService, this.rentService, this.rackService);
        });
      }

      commentDialog() : void {
        this.curComment = new Comment(0, this.curRent.data, this.curRent.nameUser, this.curRent.codeBike,
                                      "", "");

        var commentContent: CommentContent = new CommentContent("insert", this.curComment);
        this.openDialogComment(commentContent);
      }

      shiftRackBike() : void {
        var lat1 = this.curRack.latitudine;
        var lng1 = this.curRack.longitudine;

        var x = lng1 + this.deltaX;
        for (var i = 0; i < this.bikeRack.length; i++) {
          var dist = this.distanza(lat1, lng1, this.bikeRack[i].latitudine, this.bikeRack[i].longitudine);
          if  (dist < this.distMin){
            x += this.deltaX;
            this.bikeRack[i].longitudine = x;
          }
        }
      }

    /*
    Ricerca rich più vicino
    */
    nearRack(bike: Bike) {
      var lat1 = bike.latitudine;
      var long1 = bike.longitudine;

      var rackNear : Rack;
      this.distRack = 10000000.0; // distanza dal rack più vicino
      for (var k = 0; k < this.racks.length; k++) {
        var dist = this.distanza(lat1, long1, this.racks[k].latitudine, this.racks[k].longitudine);
        if (dist < this.distRack){
            this.distRack = dist;
            rackNear = this.racks[k];
        }
      }
      return rackNear;
    }
    /*
    Calcolo distaanza fra due coordinate Lat, Long
    */
    distanza(lat1:number, long1:number, lat2: number, long2: number) : number {
      var raggioTerra : number = 6372.795477598; // raggio terrestre medio
      let mat = this.Math;

      lat1 = this.rad(lat1);
      lat2 = this.rad(lat2);
      long1 = this.rad(long1);
      long2 = this.rad(long2);

      var valueCos: number = mat.sin(lat1) * mat.sin(lat2) + mat.cos(lat1) * mat.cos(lat2) * mat.cos(long1 - long2);
      var distanza: number = mat.acos(valueCos) * raggioTerra;

      return mat.round(distanza*1000.00); // distanza in metri
    }

    // Trasformazione in radianti
    rad(angle:number) : number {
      let mat = this.Math;
      return (angle * mat.PI) / 180.0;
    }

    openDialog(rentContent : RentContent, bikeService: BikeService,
              rentService: RentService, rackService: RackService): void {

      var wD: string = '300px';
      var hD: string = '550px';

      if (rentContent.mode == 'rent') {
        hD = '320px';
      }

      const dialogRef = this.dialog.open(DialogRentBike, {
        width: wD,
        height: hD,
        data: {
          mode: rentContent.mode,
          rent: rentContent.rent,
          bike: rentContent.bike,
          distRack: rentContent.distRack,
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) { //  Conferma
          if (result.mode == "rent") {
            this.rentBike(rentContent, result);
          } else {
            this.releaseBike(rentContent, result);
            this.commentDialog();
          }
        }
      });
    }

    rentBike(rentContent : RentContent, result : DialogData) : void {

      this.curBike.stato = this.nameUser;
      this.bikeService.modifyStateBike(this.curBike._id, this.curBike.stato, this.curBike.rack)
      .subscribe(data => { /*alert(data.data);*/ this.ngOnInit(); }, error => this.errorMessage = error);
        if (this.curRack.numBike > 0) {
          this.curRack.numBike--;
        }
        this.rackService.updateRack(this.curRack)
        .subscribe(data => { /*alert(data);*/ }, error => this.errorMessage = error);

        this.rentService.saveRent(this.curRent)
          .subscribe(data => {/*alert("saveRent = " + data)*/}, error => this.errorMessage = error);

        this.ricaricaBici();
    }

    releaseBike(rentContent : RentContent, result : DialogData): void {

      if (this.distRack > this.distMin) { // distanza minima per riposizionamento
        alert ("Bici troppo distante dal rack "+ this.curRack.codice)
      } else {
      this.curBike.latitudine = this.curRack.latitudine;
      this.curBike.longitudine = this.curRack.longitudine + this.deltaX;

      this.curBike.stato = "libero";
      this.curBike.rack = this.curRack.codice;
      this.bikeService.updateBike(this.curBike)
      .subscribe(data => { /*alert(data.data);*/ }, error => this.errorMessage = error);

      this.curRack.numBike++;
      this.rackService.updateRack(this.curRack)
      .subscribe(data => { /*alert(data.data); */ }, error => this.errorMessage = error);

      this.rentService.updateRent(this.curRent)
      .subscribe(data => { /*alert(data.data);*/ }, error => this.errorMessage = error);

      //this.ricaricaBici();
      }
  }

  openDialogComment(commentContent : CommentContent): void {
    const dialogRef = this.dialog.open(DialogComment, {
      width: '300px',
      height: '350px',
      data: {
        mode: commentContent.mode,
        comment: commentContent.comment
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { //  Conferma
        if (result.comment.testo != '') { // commento valido
          this.commentService.saveComment(result.comment);
        }
      }
      this.ricaricaBici();
    });
  }
}

@Component({
  selector: 'dialog-rent',
  templateUrl: 'dialog-rent.html',
})
export class DialogRentBike {
  constructor(
    public dialogRef: MatDialogRef<DialogRentBike>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onConfirm(): void {
    this.dialogRef.close(this.data);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-comment',
  templateUrl: 'dialog-comment.html',
})
export class DialogComment {
  constructor(
    public dialogRefComment: MatDialogRef<DialogComment>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataComment) {}

  onConfirmComment(): void {
    this.dialogRefComment.close(this.data);
  }

  onCloseComment(): void {
    this.dialogRefComment.close();
  }
}
