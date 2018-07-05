import { Component, OnInit, Inject } from '@angular/core';

import {CommonService} from '../services/make-request.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
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

   // prova
   animal: string = "this.animal";
   name: string = "this.name";

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

  goBack(): void {
    this.location.back();
  }

  prenota(id) : void {
    /* temp asteriscato

    alert("Vuoi penotare? = ");

    this.newService.modifyStateBike(id, this.nameUser)
    .subscribe(data => { alert(data.data); this.ngOnInit(); }, error => this.errorMessage = error)
    */
    this.openDialog()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      height: '250px',
      data: {name: this.name, animal: this.animal}
    });

    /*

    possibile uso del seguente trucco:

    if( this.userExperienceService.isLargeScreen() ) {
            var height = '55vh'
        } else {
            var height = '90vh'
        }
        */

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
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
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
