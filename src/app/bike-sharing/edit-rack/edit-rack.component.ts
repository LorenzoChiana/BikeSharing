import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup,FormControl,Validators,FormsModule, } from '@angular/forms';
import { Http,Response, Headers, RequestOptions } from '@angular/http';
import { Location } from '@angular/common';

import { RackService } from '../services/rack.service';
import { BikeService } from '../services/bike.service';
import { RentService } from '../services/rent.service';

import { Rack, Bike, Rent } from '../structDb'

@Component({
  selector: 'app-edit-rack',
  templateUrl: './edit-rack.component.html',
  styleUrls: ['./edit-rack.component.css']
})
export class EditRackComponent implements OnInit {
  private nameUser: string;

  private valbutton: string;

  private rack: Rack;

  private idRack: number;
  private codice: string;
  private numBike: number;
  private indirizzo: string;

  // Centro di Cesena
  private latitudine: number = 44.144207;
  private longitudine: number = 12.231784;
  private zoom: number = 14;

  private errorMessage;

  constructor(private rackService :RackService, private bikeService :BikeService,
    private router :Router,
    private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    this.route.params.subscribe((params) => this.idRack = params.idRack);

    this.nameUser = localStorage.getItem('login');
    this.valbutton = "Update";

    /*
    this.rackService.getRack(this.idRack).then(res => {
      this.rack =  res.json();

      //this.rack.id = data.id;

      this.codice = this.rack.codice;
      this.numBike = this.rack.numBike;
      this.indirizzo = this.rack.indirizzo;

      this.latitudine = this.rack.latitudine;
      this.longitudine = this.rack.longitudine;

      // aggiornamento numBike del rack
      this.bikeService.getRackBike(this.rack.codice).subscribe((data) => {
        this.numBike = data.length;
      });
    });
    */

    /* vecchia versione senza promise */
    this.rackService.getRack(this.idRack).subscribe((data) => {
      this.rack = data;

      this.codice = this.rack.codice;
      this.numBike = this.rack.numBike;
      this.indirizzo = this.rack.indirizzo;

      this.latitudine = this.rack.latitudine;
      this.longitudine = this.rack.longitudine;

      // aggiornamento numBike del rack
      this.bikeService.getRackBike(this.rack.codice).subscribe((data) => {
        this.numBike = data.length;
      });
    });
  }

  edit = function() {

    this.rack.codice = this.codice;
    this.rack.numBike = this.numBike;
    this.rack.indirizzo = this.indirizzo;
    this.rack.latitudine = this.latitudine;
    this.rack.longitudine = this.longitudine;

   this.rackService.updateRack(this.rack).subscribe(data =>  {  }, error => this.errorMessage = error );
  }

  infoRack(idRack : number) {
    this.router.navigate(['detail', idRack, this.nameUser]);
  }

  dragRack(event, rack): void {
    this.latitudine = event.coords.lat;
    this.longitudine = event.coords.lng;
  }

  goBack(): void {
    this.location.back();
  }

}
