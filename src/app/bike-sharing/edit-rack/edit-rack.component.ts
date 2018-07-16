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
  //styleUrls: ['./edit-rack.component.css']
  styleUrls: ['../view/view.component.css']
})
export class EditRackComponent implements OnInit {
  private nameUser: string;

  private valbutton: string;
  private valbutton2: string;

  private curRack: Rack;

  private idRack: number;
  private codice: string;
  private indirizzo: string;
  private numBike: number;
  private numPlace: number;

  // Centro di Cesena
  private latitudine: number = 44.144207;
  private longitudine: number = 12.231784;
  private zoom: number = 14;
  private showMap: boolean = true;

  private deltaLat: number = 0.0001;

  private errorMessage;

  constructor(private rackService :RackService, private bikeService :BikeService,
    private router :Router,
    private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    this.route.params.subscribe((params) => this.idRack = params.idRack);

    this.nameUser = sessionStorage.getItem('login');
    this.valbutton = "Update";

    this.curRack = new Rack(0, '<codice>', this.latitudine, this.longitudine,
                               '<indirizzo>', 0, 0);

    this.rackService.getRack(this.idRack).subscribe((data) => {
      this.curRack = data;

      this.codice = this.curRack.codice;
      this.indirizzo = this.curRack.indirizzo;
      this.numBike = this.curRack.numBike;
      this.numPlace = this.curRack.numPlace;

      this.latitudine = this.curRack.latitudine;
      this.longitudine = this.curRack.longitudine;

      // aggiornamento numBike del curRack
      this.bikeService.getRackBike(this.curRack.codice).subscribe((data) => {
        this.numBike = data.length;
      });
    });
  }

  updateRack(): void {
    this.curRack.codice = this.codice;
    this.curRack.indirizzo = this.indirizzo;

    //this.curRack.latitudine = this.latitudine;
    //this.curRack.longitudine = this.longitudine;
    this.curRack.numBike = this.numBike;
    this.curRack.numPlace = this.numPlace;

   this.rackService.updateRack(this.curRack).subscribe(data =>  {  }, error => this.errorMessage = error );
  }

  insertRack(): void {
    this.curRack.codice = this.codice;
    this.curRack.indirizzo = this.indirizzo;
    this.curRack.latitudine = this.latitudine + this.deltaLat; // per evitare sovrapposizione
    this.curRack.longitudine = this.longitudine;
    this.curRack.numBike = this.numBike;
    this.curRack.numPlace = this.numPlace;

   this.rackService.saveRack(this.curRack).subscribe(data => {}, error => this.errorMessage = error );
  }

  deleteRack(): void{
    this.rackService.deleteRack(this.curRack._id).subscribe(data => {
      this.goBack();
    }, error => this.errorMessage = error );
  }

  goBack(): void {
    this.location.back();
  }

  toggleMap() : void {
    this.showMap = !this.showMap;
  }
  
  infoRack(rack : Rack) {
    this.router.navigate(['rent-bike', rack._id]);
  }

  dragRack(event, rack): void {
  // Posizionamento mappa
  //  this.latitudine = event.coords.lat;
  //  this.longitudine = event.coords.lng;

    rack.latitudine = event.coords.lat;
    rack.longitudine = event.coords.lng;
  }

}
