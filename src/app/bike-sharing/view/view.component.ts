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
  edit: boolean;
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
   private curRack: Rack;
   private errorMessage;

   // Centro di Cesena
   private latitudine: number = 44.144207;
   private longitudine: number = 12.231784;

   private zoom: number = 14;
   private showMap: boolean = true;

   private currentLat : number;
   private currentLong : number;

  constructor(private bikeService :BikeService,
    private rackService :RackService,
    private location: Location,
    private router :Router,
    private route: ActivatedRoute,
    public dialog: MatDialog) {   }

  ngOnInit() {
    this.nameUser = sessionStorage.getItem('login');
    this.isAdmin = (sessionStorage.getItem('isAdmin') == 'true');

    this.viewRack();
  }

  viewRack() {
    this.rackService.getAllRack().subscribe(data => {
      this.rackes = data;

      this.curRack = this.rackes[0];

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

  toggleMap() : void {
    this.showMap = !this.showMap;
  }

  goBack(): void {
    this.location.back();
  }

  rackList() : void {
    this.router.navigate(['view']);
  }

  bikeList(): void {
    this.router.navigate(['rent-bike', this.curRack._id]);
  }

  rentList() : void {
    this.router.navigate(['view-rent']);
  }

  commentList() : void {
    this.router.navigate(['view-comment', '']);
  }

  preleva() : void {
      alert("Seleziona un parcheggio");
      //this.bikeList();
  }

  rilascia() : void {
      //alert("Seleziona un parcheggio di rilascio");
      this.bikeList();
  }

  infoRack(rack: Rack): void {
    this.dialogRack(rack, false);
  }

  selectRack(rack: Rack) : void {
  //  this.dialogRack(rack);
    this.router.navigate(['rent-bike', rack._id]);
  }

  editRack(rack: Rack): void {
    //this.router.navigate(['edit-rack', rack._id]);
    this.dialogRack(rack, true); // chiamata dal bottone lista
  }

  dragRack(event, rack): void {
    rack.latitudine = event.coords.lat;
    rack.longitudine = event.coords.lng;

  //  this.rackService.updateRack(rack)
  //      .subscribe(data => { }, error => this.errorMessage = error)
  }

  dialogRack(rack: Rack, edit: boolean) : void {
    this.openDialog(rack, this.isAdmin, this.rackService);
  }

  openDialog(rack : Rack, edit: boolean, rackService: RackService): void {
    var wD: string = '25%';
    var hD: string = '65%';

    if (edit) {
      wD = '30%';
      hD = '90%';
    }

    const dialogRef = this.dialog.open(ViewRackDialog, {
      width: wD,
      height: hD,
      data: {
        edit: edit,
        rack: rack
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.edit || this.isAdmin == false) {
          this.selectRack(result.rack);
        } else if (this.isAdmin && result.edit == false){
            this.viewRack();
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

   private errorMessage;

  constructor(
    public dialogRef: MatDialogRef<ViewRackDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private rackService :RackService) {}

  onSelect(): void {
    this.dialogRef.close(this.data);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onUpdate() : void{
      this.onEditRack("update");
  }

  onInsert() : void{
      this.onEditRack("insert");
  }

  onDelete() : void{
    this.onEditRack("delete");
  }
  onEdit() : void{
    this.onEditRack("delete");
  }

  onEditRack(command : string): void {
    var rack: Rack = this.data.rack;

      if (command == "update") {
        this.rackService.updateRack(rack).subscribe(data =>  {
          /*alert(data.data);*/ }, error => this.errorMessage = error );
      } else if (command == "insert") {
        this.rackService.saveRack(rack).subscribe(data =>  {
            /*alert(data.data);*/ }, error => this.errorMessage = error );
      } else if (command == "delete") {
        this.rackService.deleteRack(rack._id).subscribe(data =>  {
            /*alert(data.data);*/ }, error => this.errorMessage = error );
      }
      this.data.edit = false;
      this.dialogRef.close(this.data);
  }
}
