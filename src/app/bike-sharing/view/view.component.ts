import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CommonService} from '../services/make-request.service';

import { filter } from 'rxjs/operators';

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

  constructor(nameUser: string,
              idBike: number,
              nomeBike: string,
              timeInit: string,
              timeEnd: string) {

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
   Repdata;

   private errorMessage;

// Centro di Cesena
   lat: number = 44.1493031;
   lng: number = 12.192423;

   zoom: number = 12;

   timeInit: string = "10:30";
   timeEnd: string = "12:30";

  constructor(private newService :CommonService,
    private location: Location,
    private route: ActivatedRoute,
    public dialog: MatDialog) {   }

  ngOnInit() {
    this.nameUser = localStorage.getItem('login');

    this.viewBike()
    this.isAdmin = (this.route.snapshot.params['admin'] == "admin")
  }

  viewBike() {
    this.newService.getAllBike().subscribe(data =>  this.Repdata = data)
  }

  filterForState(stato : string) {
    return this.Repdata.filter(x => x.stato == stato);
  }

  goBack(): void {
    this.location.back();
  }

  prenota(idBike: number, nomeBike: string) : void {
    var rentContent: RentContent = new RentContent(this.nameUser,
                                                    idBike, nomeBike,
                                                    this.timeInit,
                                                    this.timeEnd);

    this.openDialog(rentContent, this.newService);
  }

  markerClick() : void {
    alert("cliccato!")
  }

  openDialog(rentContent : RentContent, newService: CommonService): void {
    const dialogRef = this.dialog.open(DialogRentBike, {
      width: '250px',
      height: '250px',
      data: {
        idBike: rentContent.idBike,
        nomeBike: rentContent.nomeBike,
        timeInit: rentContent.timeInit,
        timeEnd: rentContent.timeEnd
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.newService.modifyStateBike(rentContent.idBike, rentContent.nameUser)
      .subscribe(data => { alert(data.data); this.ngOnInit(); }, error => this.errorMessage = error)
    });
  }

    rilascia(id) : void {
      alert("Vuoi rilasciare? = ");

      this.newService.modifyStateBike(id, "libero")
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
