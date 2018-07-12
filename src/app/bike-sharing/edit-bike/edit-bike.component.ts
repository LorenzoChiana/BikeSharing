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
  _id: number;
  codice: string;
  latitudine: number;
  longitudine: number;
  stato: string;
  rack: string;
}

@Component({
  selector: 'app-edit-bike',
  templateUrl: './edit-bike.component.html',
  styleUrls: ['./edit-bike.component.css']
})
export class EditBikeComponent implements OnInit {
  private nameUser: string;
  private isAdmin: boolean;

  private valbutton: string;

  private bike: Bike;

  private idBike: number;
  private codice: string;
  private latitudine: number;
  private longitudine: number;
  private stato: string;
  private rack: string;

  private zoom: number = 14;

  private errorMessage;

  constructor(private bikeService :BikeService,
    private route: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog) {}

  ngOnInit() {
    this.nameUser = localStorage.getItem('login');
    this.isAdmin = (localStorage.getItem('isAdmin') == 'true');

    this.route.params.subscribe((params) => this.idBike = params.id);
    this.valbutton = "Update";

    this.bikeService.getBike(this.idBike).subscribe((data) => {
      this.bike = data;

      this.codice = this.bike.codice;
      this.latitudine = this.bike.latitudine;
      this.longitudine = this.bike.longitudine;
      this.stato = this.bike.stato;
      this.rack = this.bike.rack;
    });
  }

  edit = function() {
    this.bike.codice = this.codice;
    this.bike.rack = this.rack;
    this.bike.stato = this.stato;

    this.bike.mode = this.valbutton;

   this.bikeService.updateBike(this.bike).subscribe(data =>  {  /*alert(data.data);*/ }, error => this.errorMessage = error );
  }

  dragBike(event, bike): void {
    this.bike.latitudine = event.coords.lat;
    this.bike.longitudine = event.coords.lng;
  }

  goBack(): void {
    this.location.back();
  }

  dialogBike(bike : Bike) {
    this.openDialog(bike, this.bikeService);
  }

  openDialog(bike : Bike, bikeService: BikeService): void {
    const dialogRef = this.dialog.open(EditBikeDialog, {
      width: '300px',
      height: '400px',
      data: {
        _id: bike._id,
        codice: bike.codice,
        latitudine: bike.latitudine,
        longitudine: bike.longitudine,
        stato: bike.stato,
        rack: bike.rack,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bikeService.updateBike(result).subscribe(data => { /*alert(data.data); */}, error => this.errorMessage = error);
      }
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
