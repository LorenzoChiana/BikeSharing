import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { RentService } from '../services/rent.service';
import { Rent } from '../structDb';

@Component({
  selector: 'app-view-rent',
  templateUrl: './view-rent.component.html',
  styleUrls: ['./view-rent.component.css']
})
export class ViewRentComponent implements OnInit {

  private isAdmin : boolean;
  private nameUser : string;

  private repData : Rent[];

  constructor(private rentService :RentService,
    private location: Location,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      this.isAdmin = params.isAdmin;
      this.nameUser = params.nameUser;
    });

    if (this.isAdmin == true) {
      this.rentService.getAllRent().subscribe(data =>  this.repData = data);
    } else {
      this.rentService.getUserRent(this.nameUser).subscribe(data =>  this.repData = data);
    }
  }

  goBack(): void {
    this.location.back();
  }

}
