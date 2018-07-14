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

  private rents : Rent[];

  constructor(private rentService :RentService,
    private location: Location,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.nameUser = localStorage.getItem('login');
    this.isAdmin = (localStorage.getItem('isAdmin') == 'true');

    if (this.isAdmin == true) {
      this.rentService.getAllRent().subscribe(data =>  this.rents = data);
    } else {
      this.rentService.getUserRent(this.nameUser).subscribe(data =>  this.rents = data);
    }
  }

  goBack(): void {
    this.location.back();
  }

}
