import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup,FormControl,Validators,FormsModule, } from '@angular/forms';
import { Http,Response, Headers, RequestOptions } from '@angular/http';
import { Location } from '@angular/common';

import { BikeService } from '../services/make-request.service';
import { Bike } from '../bike'

@Component({
  selector: 'app-edit',
  templateUrl: './edit-bike.component.html',
  styleUrls: ['./edit-bike.component.css']
})
export class EditBikeComponent implements OnInit {

  private valbutton: string;

  private bike: Bike;

  private nome: string;
  private latitudine: number;
  private longitudine: number;

  constructor(private bikeService :BikeService, private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    this.valbutton = "Update";

    this.route.params.subscribe((params) => this.bike =
      new Bike(params.id, params.nome, params.latitudine, params.longitudine, params.stato));

    this.nome = this.bike.nome;
    this.latitudine = this.bike.latitudine;
    this.longitudine = this.bike.longitudine;
  }

  edit = function() {
    this.bike.nome = this.nome;
    this.bike.latitudine = this.latitudine;
    this.bike.longitudine = this.longitudine;

    this.bike.mode = this.valbutton;

   this.bikeService.saveBike(this.bike).subscribe(data =>  {  alert(data.data); }, error => this.errorMessage = error );
  }

  goBack(): void {
    this.location.back();
  }
}
