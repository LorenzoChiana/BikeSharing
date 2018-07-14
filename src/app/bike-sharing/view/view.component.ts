import { Component, OnInit, Inject, Injectable, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MouseEvent } from '@agm/core';

import { RackService } from '../services/rack.service';
import { BikeService } from '../services/bike.service';

import { Rack, Bike, Rent } from '../structDb'

import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';

export interface DialogData {
  rack: Rack;
}

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

  selectRack(rack: Rack) {
    this.dialogRack(rack);
  }

  dragRack(event, rack): void {
    rack.latitudine = event.coords.lat;
    rack.longitudine = event.coords.lng;

    this.rackService.updateRack(rack)
        .subscribe(data => { }, error => this.errorMessage = error)
  }

  dialogRack(rack : Rack) {
    this.openDialog(rack, this.rackService);
  }

  openDialog(rack : Rack, rackService: RackService): void {
    const dialogRef = this.dialog.open(ViewRackDialog, {
      width: '300px',
      height: '450px',
      data: {
        rack: rack
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.isAdmin == true) {
          this.router.navigate(['edit-rack', result.rack._id]);
        } else {
          this.router.navigate(['rent-bike', result.rack._id]);
        }
      }
    });
  }

}

@Component({
  selector: 'view-dialog',
  templateUrl: 'view-dialog.html',
})
export class ViewRackDialog {
  constructor(
    public dialogRef: MatDialogRef<ViewRackDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onSelect(): void {
    this.dialogRef.close(this.data);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
