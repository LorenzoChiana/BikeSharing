import { Component, OnInit, Inject, Injectable, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MouseEvent } from '@agm/core';

import { BikeService } from '../services/bike.service';
import { RentService } from '../services/rent.service';
import { RackService } from '../services/rack.service';

import { Bike, Rent, Rack } from '../structDb';

import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';

export interface DialogData {
  idBike: number;
  codeBike: string;
  timeInit: string;
  timeEnd: string;
}

export class RentContent {
  nameUser: string;

  idBike: number;
  codeBike: string;
  timeInit: string;
  timeEnd: string;

  constructor(nameUser: string, idBike: number, codeBike: string,
              timeInit: string, timeEnd: string) {
                this.nameUser = nameUser;
                this.idBike = idBike;
                this.codeBike = codeBike;
                this.timeInit = timeInit;
                this.timeEnd = timeEnd;
              }
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  private nameUser: string;
  private isAdmin: boolean;

  private rack :Rack;
  private bike: Bike;

  private bikeRack: Bike[];
  private bikeUser: Bike[];

  private zoom: number = 15;

  // Centro di Cesena
  private latitudine: number = 44.144207;
  private longitudine: number = 12.231784;

  // queste 2 opzioni forse non servono
  private currentLat : number;
  private currentLong : number;

  private codeRack: string;

  private timeInit: string = "10:30";
  private timeEnd: string = "12:30";

  private errorMessage;

// azzurro: 00FFFF

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
      private location: Location,
      public dialog: MatDialog) { }

    ngOnInit() {
      this.nameUser = localStorage.getItem('login');
      this.isAdmin = (localStorage.getItem('isAdmin') == 'true');

      this.route.params.subscribe((params) => {

        var idRack :number = params.idRack;

        this.rackService.getRack(idRack).subscribe(data => {
          this.rack = data;

          this.latitudine = this.rack.latitudine;
          this.longitudine = this.rack.longitudine;

        this.ricaricaBici();
        });

        /* modello promise
        this.rackService.getRack(idRack).then(res => {
          this.rack = res.json();
        });
        */

        console.log("(DetailComponent)[ngOnInit] bikeRack = "+this.bikeRack);
        console.log("(DetailComponent)[ngOnInit] bikeUser = "+this.bikeUser);

      });
    }

    /*
    async getAsyncData() {
    this.asyncResult = await this.httpClient.get<Employee>(this.url).toPromise();
    console.log('No issues, I will wait until promise is resolved..');
  }
    */

    ricaricaBici() : void {
      if  (this.isAdmin == true) {
        /* veccchia versione */
        this.bikeService.getAllBike().subscribe((data) => {
          this.bikeRack = data;
        });

        /*
        this.bikeService.getAllBike().then(data => {
            this.bikeRack = data;
            console.log('Promise resolved.')
        });
        */

      } else {

        this.bikeService.getRackBike(this.rack.codice).subscribe((data) => this.bikeRack = data);
        this.bikeService.getUserBike(this.nameUser).subscribe((data) => this.bikeUser = data);
      }
    }

    releaseBike(bike: Bike) : void {
      alert("Vuoi rilasciare la bici? ");

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {

            // queste 2 opzioni può darsi che non servano
            this.currentLat = position.coords.latitude;
            this.currentLong = position.coords.longitude;

            var todayString : string = new Date().toLocaleString();

            // rilascio bici (libera) su rack corrente

            bike.stato = "libero";
            bike.latitudine = this.rack.latitudine;
            bike.longitudine = this.rack.longitudine;
            bike.rack = this.rack.codice;

            this.bikeService.updateBike(bike)
            .subscribe(data => { /*alert(data.data);*/ }, error => this.errorMessage = error);

            this.rack.numBike++;

            this.rackService.updateRack(this.rack)
            .subscribe(data => { /*alert(data.data);*/ }, error => this.errorMessage = error);

            this.ricaricaBici();
          });
        } else {
          alert("Geolocation is not supported by this browser.");
        }
    }

    selectBike(bike : Bike): void {
      this.bike = bike; // memorizzo bike corrente
      if (this.isAdmin) {
        this.router.navigate(['editBike', bike._id]);
      } else {
        this.rentBike(bike);
      }
    }

    rentBike(bike : Bike) : void {
      var rentContent: RentContent = new RentContent(this.nameUser, bike._id, bike.codice, this.timeInit, this.timeEnd);

      this.openDialog(rentContent, this.bikeService, this.rentService, this.rackService);
    }

    dragBike(event, bike): void {
      bike.latitudine = event.coords.lat;
      bike.longitudine = event.coords.lng;

      bike.mode = "update";

      this.bikeService.updateBike(bike)
          .subscribe(data => {}, error => this.errorMessage = error)
    }

    openDialog(rentContent : RentContent, bikeService: BikeService,
      rentService: RentService, rackService: RackService): void {
      const dialogRef = this.dialog.open(DialogRentBike, {
        width: '300px',
        height: '400px',
        data: {
          idBike: rentContent.idBike,
          codeBike: rentContent.codeBike,
          timeInit: rentContent.timeInit,
          timeEnd: rentContent.timeEnd
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.bikeService.modifyStateBike(rentContent.idBike, rentContent.nameUser, this.bike.rack)
            .subscribe(data => { alert(data.data); this.ngOnInit(); }, error => this.errorMessage = error)

            var today: Date = new Date();
            var todayString: string = today.toDateString();

            this.rentService.saveRent(todayString, rentContent.nameUser,
              rentContent.codeBike, result.timeInit, result.timeEnd)
              .subscribe(data => {/* alert(data.data); */ }, error => this.errorMessage = error);

              if (this.rack.numBike > 0) {
                this.rack.numBike--;
              }

              this.rackService.updateRack(this.rack)
              .subscribe(data => { alert(data.data); }, error => this.errorMessage = error);

              this.ricaricaBici();
          }
      });
    }

    goBack(): void {
      this.location.back();
    }
}

@Component({
  selector: 'dialog',
  templateUrl: 'dialog.html',
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
