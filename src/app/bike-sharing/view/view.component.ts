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
   Repdata;

   lat: number = 51.678418;
   lng: number = 7.809007;

  constructor(private newService :CommonService,
    private location: Location,
    private route: ActivatedRoute) {   }

  ngOnInit() {
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
    /*
    this.newService.deleteUser(id)
    .subscribe(data =>   { alert(data.data) ; this.ngOnInit();}, error => this.errorMessage = error )
    */
  }
}
