import { Component, OnInit, Inject, Injectable, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MouseEvent } from '@agm/core';

import { RackService } from '../services/rack.service';
import { BikeService } from '../services/bike.service';

import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';

import { Rack, Bike, Rent } from '../structDb'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

   private isAdmin: boolean;
   private nameUser: string;

   private rackes : Rack[];
   private errorMessage;

   // Centro di Cesena
   private latitudine: number = 44.144207;
   private longitudine: number = 12.231784;

   private zoom: number = 14;

   private currentLat : number;
   private currentLong : number;

  constructor(private bikeService :BikeService,
    private rackService :RackService,
    private location: Location,
    private router :Router,
    private route: ActivatedRoute,
    public dialog: MatDialog) {   }

  ngOnInit() {
    this.nameUser = localStorage.getItem('login');
    this.isAdmin = (localStorage.getItem('isAdmin') == 'true');

    this.viewRack();
  }

  viewRack() {
    this.rackService.getAllRack().subscribe(data => {
      this.rackes = data;

      // aggiornamento num bici rack
      for (var i = 0; i < this.rackes.length; i++) {
        this.rackes[i].numBike = 0;
        this.bikeService.getRackBike(this.rackes[i].codice).subscribe(data => {
          var numBike = data.length;
          if ( numBike > 0) {
            var code = data[0].rack;
            for(var k = 0; k < this.rackes.length; k++) {
              if (this.rackes[k].codice == code) {
                this.rackes[k].numBike = data.length;
                break;
              }
            }
          }
        });
      }

    });
  }

  goBack(): void {
    this.location.back();
  }

  infoRack(idRack : number) {
    this.router.navigate(['detail', idRack, this.nameUser]);
  }

  dragRack(event, rack): void {
    rack.latitudine = event.coords.lat;
    rack.longitudine = event.coords.lng;

    this.rackService.updateRack(rack)
        .subscribe(data => { }, error => this.errorMessage = error)
  }

  /*
  infoRack(idBike: number, codiceBike: string, latitudineBike: number, longitudineBike: number) : void {
      var rack : Rack = new Rack(idBike, codiceBike, latitudineBike, longitudineBike);

      this.route.navigate(['detail', rack, this.nameUser]);
  }
  */

/*
  openDialogRelease(rentContent : RentContent, bikeService: BikeService, rentService: RentService): void {
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
      if (result.timeInit != rentContent.timeInit || result.timeEnd != rentContent.timeEnd) {
        this.bikeService.modifyStateBike(rentContent.idBike, rentContent.nameUser)
        .subscribe(data => { alert(data.data); this.ngOnInit(); }, error => this.errorMessage = error)

        var today = new Date();
        var todayString = today.toDateString();

        this.prenotationService.savePrenotation(todayString, rentContent.nameUser, rentContent.codeBike,
          result.timeInit, result.timeEnd)
          .subscribe(data => { alert(data.data); }, error => this.errorMessage = error);
      } else {
        //alert("stato bici non modificato");
      }
    });
  }
  */
  }
