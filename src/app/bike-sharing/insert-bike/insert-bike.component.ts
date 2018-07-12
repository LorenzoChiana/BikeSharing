import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormsModule, } from '@angular/forms';
import { Http,Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { BikeService } from '../services/bike.service';

@Component({
  selector: 'app-insert-bike',
  templateUrl: './insert-bike.component.html',
  //styleUrls: ['./insert-bike.component.css'] da aggiungere dopo modifica
})
export class InsertBikeComponent implements OnInit {

  private valbutton: string;

  constructor(private bikeService :BikeService, private route :Router,
    private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.valbutton = "Save";
  }

  onSave = function(bike, isValid: boolean) {
   bike.mode= this.valbutton;
    this.bikeService.saveBike(bike)
    .subscribe(data => { alert(data.data) }, error => this.errorMessage = error)
  }
}
