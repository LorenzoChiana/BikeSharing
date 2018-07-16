import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { RentService } from '../services/rent.service';
import { Rent } from '../structDb';

@Component({
  selector: 'app-view-rent',
  templateUrl: './view-rent.component.html',
  //styleUrls: ['./view-rent.component.css']
  styleUrls: ['../view/view.component.css']
})
export class ViewRentComponent implements OnInit {

  private isAdmin : boolean;
  private nameUser : string;

  private rents : Rent[];
  private totTempo: number;
  private totCosto: number;

  constructor(private rentService :RentService,
    private location: Location,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.nameUser = sessionStorage.getItem('login');
    this.isAdmin = (sessionStorage.getItem('isAdmin') == 'true');

    if (this.isAdmin == true) {
      this.rentService.getAllRent().subscribe(data => {
        this.rents = data;
        this.calcolaTotali();
      });
    } else {
      this.rentService.getUserRent(this.nameUser).subscribe(data =>  {
        this.rents = data;
        this.calcolaTotali();
      });
    }
  }

  calcolaTotali(): void {
    this.totTempo = 0;
    this.totCosto = 0;

    for (var i: number = 0; i < this.rents.length; i++) {
      this.totTempo += this.rents[i].tempo;
      this.totCosto += this.rents[i].costo;
    }
  }

  goBack(): void {
    this.location.back();
  }

}
