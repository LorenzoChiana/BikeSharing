import { Component, OnInit, Inject, Injectable, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MouseEvent } from '@agm/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { RackService } from '../services/rack.service';
import { BikeService } from '../services/bike.service';

import { Rack, Bike, Rent } from '../structDb'

import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';

import {TranslateService} from '@ngx-translate/core';

import { } from '@types/googlemaps';

export interface DialogData {
  edit: boolean;
  rack: Rack;
}

export interface DialogDataAlert {
  testo: string;
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

  /*color = 'black';
  private open:BehaviorSubject<boolean> = new BehaviorSubject(false);*/

  private step: number = 0;

  labelUserOptions = {
    //color: '#FFFFFF',
    color: 'black',
    fontFamily: '',
    fontSize: '14px',
    fontWeight: 'bold',
    //text: this.translate.instant("USER_POSITION"),
    text: 'User'
  }

  private userLat: number;
  private userLong: number;
  private userLocation: boolean; // attivazione e disattivaz. geolocalizzazione dell'utente

  setStep(index: number) {
    this.step = index;
  }

  constructor(
    private bikeService :BikeService,
    private rackService :RackService,
    private location: Location,
    private router :Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.nameUser = sessionStorage.getItem('login');
    this.isAdmin = (sessionStorage.getItem('isAdmin') == 'true');
    sessionStorage.setItem('location', 'view');

    this.userLat = -1;
    this.userLong = -1;

    //this.labelUserOptions.text = this.translate.instant("USER_POSITION");

    this.viewRack();

    sessionStorage.setItem('userLocation', 'false'); // versione con drag and drop
    this.userLocation = true;
    this.getUserLocation();
  }

  private output(log) {
    console.log(log);
  }

  getUserLocation() : void {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            this.showPosition(position);
        }, this.showError);
    } else {
        alert("Geolocation is not supported by this browser.");
        //this.alertDialog(this.translate.instant("GEOLOCATION_NOT_SUPPORTED"));
    }
  }

  showPosition(position) : void {
    if (this.userLocation) {
      this.userLat = position.coords.latitude;
      this.userLong = position.coords.longitude;
    } else {
      // impostazioni fisse
      this.userLat = 44.1443272;
      this.userLong = 12.2270023;
    }
  }

  showError(error) : void {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("Location permit denied. Now the map works with drag & drop.");
       // this.alertDialog(this.translate.instant("GEO_PERMISSION_DANIED"));
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location error: information not available.");
        //this.alertDialog(this.translate.instant("GEO_INFO_NOT_AVAILABLE"));
        break;
      case error.TIMEOUT:
        alert("Lacation error: time out error.");
        //this.alertDialog(this.translate.instant("GEO_TIMEOUT"));
        break;
      case error.UNKNOWN_ERROR:
        alert("Location error: unknow error.");
        //this.alertDialog(this.translate.instant("GEO_UNKNOW_ERR"));
        break;
      }
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
      console.log(this.rackes);
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
    sessionStorage.setItem('userLat', ""+this.userLat);
    sessionStorage.setItem('userLong', ""+this.userLong);
    this.router.navigate(['rent-bike', ""+this.curRack._id]);
  }

  rentList() : void {
    this.router.navigate(['view-rent']);
  }

  commentList() : void {
    this.router.navigate(['view-comment', '']);
  }

  preleva() : void {
      alert(this.translate.instant("SELECT_A_RACK"));
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
    sessionStorage.setItem('userLat', ""+this.userLat);
    sessionStorage.setItem('userLong', ""+this.userLong);
    this.router.navigate(['rent-bike', rack._id]);
  }

  editRack(rack: Rack): void {
    this.dialogRack(rack, true); // chiamata dal bottone lista
  }

  dragRack(event, rack): void {
    rack.latitudine = event.coords.lat;
    rack.longitudine = event.coords.lng;
  }

  dragUser(event): void {
    this.userLat = event.coords.lat;
    this.userLong = event.coords.lng;
  }

  dialogRack(rack: Rack, edit: boolean) : void {
    this.openDialog(rack, this.isAdmin, this.rackService);
  }

  onMouseOver(infoWindow, gm) {
    if (gm.lastOpen != null) {
      gm.lastOpen.close();
    }
    gm.lastOpen = infoWindow;
    infoWindow.open();
  }

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

  openDialog(rack : Rack, edit: boolean, rackService: RackService): void {
    /*var wD: string = '25%';
    var hD: string = '65%';*/
    var wD: string = '100vw';
    var hD: string = '45vh';

    var dialogClass: string = 'viewDialog';

    if (edit) {
      /*wD = '30%';
      hD = '90%';*/
      wD = '100vw';
      hD = '50vh';

      dialogClass = 'editDialog';
    }

    const dialogRef = this.dialog.open(ViewRackDialog, {
      width: wD,
      height: hD,
      
      panelClass: dialogClass,
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
  templateUrl: '../../dialogs/view-dialog.html',
})
export class ViewRackDialog {

   private errorMessage;

  constructor(
    public dialogRef: MatDialogRef<ViewRackDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private translate: TranslateService,
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

/*---- dialog ALERT ----*/
@Component({
  selector: 'dialog-alert',
  templateUrl: '../../dialogs/dialog-alert.html',
})
export class DialogAlert {
  constructor(
    public dialogRef: MatDialogRef<DialogAlert>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataAlert) {}

  onCloseAlert(): void {
    this.dialogRef.close();
  }
}
