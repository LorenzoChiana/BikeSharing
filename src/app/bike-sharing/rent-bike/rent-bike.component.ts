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

//import { TranslateService } from '../../services/translate.service';
import {TranslateService} from '@ngx-translate/core';

export interface DialogData {
  rent: Rent;
  bike: Bike;
  rack: Rack;
  distRack: number;
}

export class RentContent {
  mode: string;
  rent: Rent;
  bike: Bike;
  rack: Rack;
  distRack: number;

  constructor(mode: string, rent: Rent, bike: Bike, rack: Rack, distRack: number) {
                this.mode = mode;
                this.rent = rent;
                this.bike = bike;
                this.rack = rack;
                this.distRack = distRack;
              }
}

export interface DialogDataBike {
  bike: Bike;
  racks: Rack[];
}

export class BikeContent {
  mode: string;
  bike: Bike;
  racks: Rack[];

  constructor(mode: string, bike: Bike, racks: Rack[]) {
    this.mode = mode;
    this.bike = bike;
    this.racks = racks;
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

/**/
export interface DialogDataAlert {
  testo: string;
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

  private release: boolean = false;  // Rilascio effettuato

  private errorMessage;

  private Math: any;

  private step: number = 0;

  setStep(index: number) {
    this.step = index;
  }

  labelOptions = {
    color: '#FFFFFF',
    fontFamily: '',
    fontSize: '14px',
    fontWeight: 'bold',
    text: 'Bici',
  }

    constructor(
      private translate: TranslateService,
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
      this.nameUser = sessionStorage.getItem('login');
      this.isAdmin = (sessionStorage.getItem('isAdmin') == 'true');

      this.curRack = new Rack(0, '', 0, 0, '', 0, 0); // rack nullo

      this.route.params.subscribe((params) => {

        var idRack :number = params.idRack;

        this.rackService.getRack(idRack).subscribe(data => {
          this.curRack = data;
          this.latitudine = this.curRack.latitudine;
          this.longitudine = this.curRack.longitudine;

          this.reloadBike();
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

    // -------- Funzioni tool bar
    toggleMap() : void {
      this.showMap = !this.showMap;
    }

    goBack(): void {
        this.location.back();
    }

    rackList() : void {
      this.router.navigate(['view']);
    }

    preleva() : void {
      //this.openDialogAlert("Seleziona bici da prelevare");
      this.openDialogAlert(this.translate.instant("WARNING_BORROW"));
      //let foo:string = this.translate.get('Date');
    }

    rentList() : void {
      this.router.navigate(['view-rent']);
    }

    commentList() : void {
      this.router.navigate(['view-comment', '']);
    }

    rilascia() : void {
      if (this.bikeUser.length > 0) {
        this.curBike = this.bikeUser[0];
        this.releaseDialog(this.curBike);
      } else {
        this.alertDialog(this.translate.instant("WARNING_NO_BIKE_RELEASE"));
      }
    }

    editBike(bike: Bike) : void {
      //this.router.navigate(['edit-bike', bike._id]);
      this.bikeDialog(bike);
    }

    commentBike(bike: Bike) : void {
      this.router.navigate(['view-comment', bike.codice]);
    }

    reloadBike() : void {
      if  (this.isAdmin == true) {
        this.bikeService.getRackBike(this.curRack.codice).subscribe((data) => {
          this.bikeRack = data; });

        this.bikeService.getUseBike(this.curRack.codice).subscribe((data) => {
          this.bikeUser = data;
          this.shiftRackBike();
        });
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

    // Funzioni mappa
    selectRack(rack : Rack): void {
        this.curRack = rack; // cambio rack corrente
        this.reloadBike();
    }

    selectBike(bike : Bike, mode: number): void {
      this.curBike = bike; // memorizzo bike corrente
      if (this.isAdmin) {
        if (mode == 0) { // selezione bici libera
            //this.editBike(bike);
            this.editBike(bike);
          } else { // selezione bici in uso utente
              this.nameUser = bike.stato;
            //  this.editBike(bike);
              this.releaseDialog(bike);  // Rilascio da admin
         }
      } else {
        if (mode == 0) { // selezione bici libera
          this.rentDialog(bike);
        } else { // selezione bici in uso utente
          this.releaseDialog(bike);
        }
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


    rentDialog(bike : Bike) : void {
      this.curBike = bike;
      var now: Date = new Date();
      var todayString: string = now.toDateString();

      var timeInit: string = now.getHours() + ":" + now.getMinutes();
      var timeEnd: string = "";
      var tempo: number = 0;
      var costo: number = 0;
      var fromRack: string = this.curBike.rack;
      var toRack: string = "";

      this.curRent = new Rent(0, todayString, this.nameUser, this.curBike.codice,
                              timeInit, timeEnd,
                              fromRack, toRack, this.curBike.totKm,
                              tempo, costo);

      var rentContent: RentContent = new RentContent("rent",
                                                      this.curRent, this.curBike,
                                                      this.curRack, this.distRack);

      this.openDialog(rentContent, this.bikeService, this.rentService, this.rackService);
    }

    releaseDialog(bike: Bike) : void {
        var nearRack : Rack = this.nearRack(bike); // ricerca rack più vicino
        this.curRack = nearRack;
        this.curBike = bike;

        this.rentService.getBikeRent(this.nameUser, this.curBike.codice, "").subscribe((data) => {
          this.rents = data;
          if (data.length <= 0 ){
            this.alertDialog(this.translate.instant("NO_BOOKING_FOUND"));
        } else {
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

            var totKm: number = this.curBike.totKm - this.curRent.totKm;

            this.curRent.toRack = this.curRack.codice;
            this.curRent.totKm = this.Math.round(totKm * 1000)/1000;

            this.curRent.tempo = this.Math.round(tempo * 100)/100; // messo x dare valore
            this.curRent.costo = this.Math.round(costo * 100)/100;

            this.curBike.totTime += tempo;

            var rentContent: RentContent = new RentContent("release",
                                                        this.curRent, this.curBike,
                                                        this.curRack, this.distRack);
            this.openDialog(rentContent, this.bikeService, this.rentService, this.rackService);
          }
        });
      }

      commentDialog() : void {
        this.curComment = new Comment(0, this.curRent.data, this.curRent.nameUser, this.curRent.codeBike,
                                      "", "icona");

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
            this.bikeRack[i].latitudine = lat1;
          }
        }
      }

    /*
    Ricerca rich più vicino
    */
    nearRack(bike: Bike): Rack {
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

    rentBike(rentContent : RentContent, result : DialogData) : void {
      this.curBike.stato = this.nameUser;
      this.bikeService.modifyStateBike(this.curBike._id, this.curBike.stato, this.curBike.rack)
      .subscribe(data => { this.ngOnInit(); }, error => this.errorMessage = error);
        if (this.curRack.numBike > 0) {
          this.curRack.numBike--;
        }
        this.rackService.updateRack(this.curRack)
        .subscribe(data => {}, error => this.errorMessage = error);

        this.rentService.saveRent(this.curRent)
          .subscribe(data => {}, error => this.errorMessage = error);

        this.reloadBike();
    }

    releaseBike(rentContent : RentContent, result : DialogData): void {
      this.release = false;
      if (this.distRack > this.distMin && !this.isAdmin) { // distanza minima per riposizionamento
        var msg : string = this.translate.instant("BIKE_TOO_FAR") + " " + this.curRack.codice;
        msg = msg +  " - " + this.curRack.indirizzo;
        this.openDialogAlert(msg);
      } else if (this.curRack.numPlace - this.curRack.numBike <= 0) { // distanza minima per riposizionamento
          this.openDialogAlert(this.translate.instant("FULL_BIKE_PARKING") + " " + this.curRack.codice);
      } else {
      this.release = true;

      this.curBike.latitudine = this.curRack.latitudine;
      this.curBike.longitudine = this.curRack.longitudine + this.deltaX;

      this.curBike.stato = "libero";
      this.curBike.rack = this.curRack.codice;
      this.bikeService.updateBike(this.curBike)
      .subscribe(data => { }, error => this.errorMessage = error);

      this.curRack.numBike++;
      this.rackService.updateRack(this.curRack)
      .subscribe(data => { }, error => this.errorMessage = error);

      this.rentService.updateRent(this.curRent)
      .subscribe(data => { }, error => this.errorMessage = error);
      }
  }

  /*---- dialog RENT  ----*/
  openDialog(rentContent : RentContent, bikeService: BikeService,
            rentService: RentService, rackService: RackService): void {

    var wD: string = '30%';
    var hD: string = '57%';

    if (rentContent.mode == 'rent') {
      hD = '38%';
    }

    const dialogRef = this.dialog.open(DialogRentBike, {
      /*width: wD,*/
      height: hD,
      panelClass: 'rentDialog',
      data: {
        mode: rentContent.mode,
        rent: rentContent.rent,
        bike: rentContent.bike,
        rack: rentContent.rack,
        distRack: rentContent.distRack,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { //  Conferma
        if (result.mode == "rent") {
          this.rentBike(rentContent, result);
        } else {
          this.releaseBike(rentContent, result);
          if (this.release) {
              this.commentDialog();
          }
        }
      }
    });
  }

  /*---- dialog BIKE ----*/
  bikeDialog(bike : Bike) : void {
    this.openDialogBike(bike, this.racks);
  }

  openDialogBike(bike : Bike, racks: Rack[]): void {
    const dialogRef = this.dialog.open(BikeDialog, {
      /*width: '40%',
      height: '95%',*/
      panelClass: 'bikeDialog',
      data: {
        bike: bike,
        racks: racks
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reloadBike();
      }
    });
  }

  /*---- dialog commento  ----*/
  openDialogComment(commentContent : CommentContent): void {
    const dialogRef = this.dialog.open(DialogComment, {
      /*width: '30%',
      height: '50%',*/
      panelClass: 'commentDialog',
      data: {
        mode: commentContent.mode,
        comment: commentContent.comment
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { //  Conferma
        if (result.comment.testo != '') { // commento valido
          this.commentService.saveComment(result.comment).subscribe(data => {
          });
        }
      }

      this.reloadBike();
    });
  }

  /*---- dialog alert ----*/
  alertDialog(msg: string) : void {
    this.openDialogAlert(msg);
  }

  openDialogAlert(msg: string): void {
    const dialogRef = this.dialog.open(DialogAlert, {
      /*width: '30%',
      height: '30%',*/
      panelClass: 'alertDialog',
      data: {
        msg: msg,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

/*---- dialog RENT ----*/
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

/*---- dialog BIKE ----*/
@Component({
selector: 'dialog-bike',
templateUrl: 'dialog-bike.html',
})
export class BikeDialog {

  private errorMessage;

constructor(
  public dialogRef: MatDialogRef<BikeDialog>,
  @Inject(MAT_DIALOG_DATA) public data: DialogDataBike,
  private bikeService :BikeService,
  ) {}

  onUpdate() : void{
      this.onEdit("update");
  }
  onInsert() : void{
      this.onEdit("insert");
  }
  onDelete() : void{
    this.deleteBike();
  }

  deleteBike(): void{
    var bike: Bike = this.data.bike;
    this.bikeService.deleteBike(bike._id).subscribe(data => {
    }, error => this.errorMessage = error );

    this.dialogRef.close(this.data);
  }

onEdit(command : string): void {
  var bike: Bike = this.data.bike;

  var racks: Rack[] = this.data.racks;
  var rack: Rack;
  var ok: boolean = false;

  // Ricerca rack se esiste
  for (var i: number = 0; i < racks.length; i++) {
    if (racks[i].codice == bike.rack) {
      rack = racks[i];
      ok = true;
      break;
    }
  }

  if (ok) {
    // Assegno posizione del rack
    bike.latitudine = rack.latitudine;
    bike.longitudine = rack.longitudine;
    if (command == "update") { // UPDATE
      this.bikeService.updateBike(bike).subscribe(data =>  {
        /*alert(data.data);*/ }, error => this.errorMessage = error );
    } else {    // Inserimento
      this.bikeService.saveBike(bike).subscribe(data =>  {
          /*alert(data.data);*/ }, error => this.errorMessage = error );
    }
    this.dialogRef.close(this.data);
  } else {
    alert("Rastrelliera non trovata: " + bike.rack);
  }
}

onClose(): void {
  this.dialogRef.close();
}
}

/*---- dialog COMMENTI ----*/
@Component({
  selector: 'dialog-comment',
  templateUrl: 'dialog-comment.html'
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

/*---- dialog ALERT ----*/
@Component({
  selector: 'dialog-alert',
  templateUrl: 'dialog-alert.html',
})
export class DialogAlert {
  constructor(
    public dialogRef: MatDialogRef<DialogAlert>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataAlert) {}

  onCloseAlert(): void {
    this.dialogRef.close();
  }
}
