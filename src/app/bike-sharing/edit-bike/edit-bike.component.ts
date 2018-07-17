import { Component, OnInit, Inject, Injectable, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup,FormControl,Validators,FormsModule, } from '@angular/forms';
import { Http,Response, Headers, RequestOptions } from '@angular/http';
import { Location } from '@angular/common';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MouseEvent } from '@agm/core';

import { RackService } from '../services/rack.service';
import { BikeService } from '../services/bike.service';
import { RentService } from '../services/rent.service';

import { Rack, Bike, Rent } from '../structDb'

export interface DialogData {
  bike: Bike;
}

@Component({
  selector: 'app-edit-bike',
  templateUrl: './edit-bike.component.html',
  //styleUrls: ['./edit-bike.component.css']
  styleUrls: ['../view/view.component.css']
})
export class EditBikeComponent implements OnInit {
  private nameUser: string;
  private isAdmin: boolean;

  private bikeRack: Bike[];

  private curBike: Bike;
  private curRack: Rack;

  private idBike: number;
  private codice: string;
  private stato: string;
  private rack: string;
  private totKm: number;

  // Centro di Cesena
  private latitudine: number = 44.144207;
  private longitudine: number = 12.231784;
  private zoom: number = 14;
  private showMap: boolean = true;
  private deltaX: number = 0.0001;

  private errorMessage;

  constructor(private bikeService :BikeService,
    private rackService: RackService,
    private route: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog) {}

  ngOnInit() {
    this.nameUser = sessionStorage.getItem('login');
    this.isAdmin = (sessionStorage.getItem('isAdmin') == 'true');
    this.route.params.subscribe((params) => this.idBike = params.idBike);

    this.curBike = new Bike(0, '<codice>', this.latitudine, this.longitudine,
                               'libero', '<rack>', 0);

    this.bikeService.getBike(this.idBike).subscribe((data) => {
      this.curBike = data;

      this.codice = this.curBike.codice;
      this.latitudine = this.curBike.latitudine;
      this.longitudine = this.curBike.longitudine;
      this.stato = this.curBike.stato;
      this.rack = this.curBike.rack;
      this.totKm = this.curBike.totKm;

        this.bikeService.getRackBike(this.rack).subscribe((data) => {
          this.bikeRack = data; // rimuovere curBike
        });
      });
  }

  updateBike(): void {
    this.curBike.codice = this.codice;
    this.curBike.rack = this.rack;
    this.curBike.stato = this.stato;
    this.curBike.totKm = this.totKm;

    this.rackService.getRackByCode(this.curBike.rack).subscribe((data) => {
      if (data.length > 0) {
        this.curRack = data[0];
        this.curBike.latitudine = this.curRack.latitudine;
        this.curBike.longitudine = this.curRack.longitudine;
        this.bikeService.updateBike(this.curBike).subscribe(data =>  {
          /*alert(data.data);*/ }, error => this.errorMessage = error );
      //  this.close();
      } else {
        alert("ERRORE Rack non trovato: " + this.curBike.rack);
      }
    });
  }

  insertBike(): void {
    this.curBike.codice = this.codice;
    this.curBike.rack = this.rack;
    this.curBike.stato = this.stato;
    this.curBike.totKm = this.totKm;

    this.rackService.getRackByCode(this.curBike.rack).subscribe((data) => {
      if (data.length > 0) {
        this.curRack = data[0];
        this.curBike.latitudine = this.curRack.latitudine;
        this.curBike.longitudine = this.curRack.longitudine;

        this.bikeService.saveBike(this.curBike).subscribe(data =>  {
          alert(data.data);
        }, error => this.errorMessage = error );

        this.close();
      } else {
        alert("ERRORE Rack non trovato: " + this.curBike.rack);
      }
    });

  }

  deleteBike(): void{
    this.bikeService.deleteBike(this.curBike._id).subscribe(data => {
      this.goBack();
    }, error => this.errorMessage = error );
  }


  goBack(): void {
    this.location.back();
  }

  close(): void {
    this.location.back();
  }

  toggleMap() : void {
    this.showMap = !this.showMap;
  }

  dragBike(event, bike): void {
    this.curBike.latitudine = event.coords.lat;
    this.curBike.longitudine = event.coords.lng;
  }

  selectBike(bike : Bike, mode : number): void {
    this.curBike = bike;
    this.codice = this.curBike.codice;
    this.latitudine = this.curBike.latitudine;
    this.longitudine = this.curBike.longitudine;
    this.stato = this.curBike.stato;
    this.rack = this.curBike.rack;
    this.totKm = this.curBike.totKm;
    if (mode == 1){
        this.dialogBike (this.curBike);
    }
  }

  dialogBike(bike : Bike) {
    this.openDialogBike(bike, this.bikeService);
  }

  openDialogBike(bike : Bike, bikeService: BikeService): void {
    const dialogRef = this.dialog.open(EditBikeDialog, {
      width: '300px',
      height: '400px',
      data: {
        bike: bike
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateBike(result.bike);
    });
  }
}

@Component({
  selector: 'edit-bike-dialog',
  templateUrl: 'edit-bike-dialog.html',
})
export class EditBikeDialog {
  constructor(
    public dialogRef: MatDialogRef<EditBikeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onUpdate(): void {
    this.dialogRef.close(this.data);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
