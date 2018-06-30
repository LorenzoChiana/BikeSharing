import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CommonService } from '../services/make-request.service';
import { Location } from '@angular/common';

import { Bike } from '../bike'

@Component({
  selector: 'app-edit-bike',
  templateUrl: './edit-bike.component.html',
  styleUrls: ['./edit-bike.component.css']
})
export class EditBikeComponent implements OnInit {

  bikeDetail;

  constructor(private newService :CommonService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    let id; // = this.route.snapshot.params['ind']
    this.route.params.subscribe((params) => id = params.id);

    //this.newService.getBike(id).subscribe(data => this.bikeDetail = data);

    this.newService.getBike(id).subscribe(data => alert(data.nome));

    //alert("nome = " + this.bikeDetail.getNome())
  }



}
