import { Component, OnInit } from '@angular/core';

import {CommonService} from '../services/make-request.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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

  constructor(private newService :CommonService,
    private location: Location,
    private route: ActivatedRoute) {   }

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
  }

  rilascia(id) : void {
    alert("Vuoi rilasciare? = ");

    this.newService.modifyStateBike(id, "libero")
    .subscribe(data => { alert(data.data); this.ngOnInit(); }, error => this.errorMessage = error)
  }
}
