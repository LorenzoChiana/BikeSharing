import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { BikeService } from '../services/make-request.service';
import { PrenotationService } from '../services/make-prenotation.service';

import { MouseEvent } from '@agm/core';

import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators/filter';

import { Bike } from '../bike'
import { Prenotazione } from '../prenotazione'

export interface DialogData {
  idBike: number;
  nomeBike: string;
  timeInit: string;
  timeEnd: string;
}

export class RentContent {
  nameUser: string;

  idBike: number;
  nomeBike: string;
  timeInit: string;
  timeEnd: string;

  constructor(nameUser: string, idBike: number, nomeBike: string,
              timeInit: string, timeEnd: string) {
                this.nameUser = nameUser;
                this.idBike = idBike;
                this.nomeBike = nomeBike;
                this.timeInit = timeInit;
                this.timeEnd = timeEnd;
              }
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

   private isAdmin: boolean;
   private nameUser: string;

   private Repdata : Bike[];
   private errorMessage;

   // Centro di Cesena
   private lat: number = 44.1493031;
   private lng: number = 12.192423;
   private zoom: number = 12;

   timeInit: string = "10:30";
   timeEnd: string = "12:30";

  constructor(private bikeService :BikeService,
    private prenotationService :PrenotationService,
    private location: Location,
    private route: ActivatedRoute,
    public dialog: MatDialog) {   }

  ngOnInit() {
    this.nameUser = localStorage.getItem('login')
    this.isAdmin = (this.route.snapshot.params['admin'] == "admin")

    this.viewBike()
  }

  viewBike() {
    this.bikeService.getAllBike().subscribe(data =>  this.Repdata = data)
  }

  filterForState(stato : string) {
//    return this.Repdata.pipe(filter(x => x.stato == stato));
      return this.Repdata.filter(x => x.stato == stato);
  }

  goBack(): void {
    this.location.back();
  }

  informaz() : void {

  }

  prenota(idBike: number, nomeBike: string) : void {
    var rentContent: RentContent = new RentContent(this.nameUser, idBike, nomeBike, this.timeInit, this.timeEnd);
    this.openDialog(rentContent, this.bikeService, this.prenotationService);
  }

  openDialog(rentContent : RentContent, bikeService: BikeService, prenotationService: PrenotationService): void {
    const dialogRef = this.dialog.open(DialogRentBike, {
      width: '300px',
      height: '400px',
      data: {
        idBike: rentContent.idBike,
        nomeBike: rentContent.nomeBike,
        timeInit: rentContent.timeInit,
        timeEnd: rentContent.timeEnd
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.timeInit != rentContent.timeInit || result.timeEnd != rentContent.timeEnd) {
        this.bikeService.modifyStateBike(rentContent.idBike, rentContent.nameUser)
        .subscribe(data => { alert(data.data); this.ngOnInit(); }, error => this.errorMessage = error)

        var today = new Date();

        //today.format('dd-m-yy');

        var todayString = today.toDateString();

        this.prenotationService.savePrenotation(result.timeInit, result.timeEnd,
          rentContent.nameUser, rentContent.nomeBike, todayString)
          .subscribe(data => { alert(data.data); }, error => this.errorMessage = error)
      } else {
        alert("stato bici non modificato")
      }
    });
  }

    rilascia(id) : void {
      alert("Vuoi rilasciare? = ");

      this.bikeService.modifyStateBike(id, "libero")
      .subscribe(data => { alert(data.data); this.ngOnInit(); }, error => this.errorMessage = error)
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

  onNoClick(): void {
    this.dialogRef.close();

    alert("close ")
  }
}
