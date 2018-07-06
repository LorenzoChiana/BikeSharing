import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Bike } from '../bike'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  private imageUrl: string; // = "/assets/img/default-image.png";
  private latitudine : number;
  private longitudine : number;

  private zoom: number = 12;

  private bike: Bike;

// azzurro: 00FFFF

  labelOptions = {
    color: '#FFFFFF',
    fontFamily: '',
    fontSize: '14px',
    fontWeight: 'bold',
    text: 'Bici',
  }

    constructor(private route: ActivatedRoute, private location: Location) { }

    ngOnInit() {
      this.route.params.subscribe((params) => this.bike =
        new Bike(params.id, params.nome, params.latitudine, params.longitudine, params.stato));

        this.latitudine = +this.bike.latitudine;
        this.longitudine = +this.bike.longitudine;
    }

    goBack(): void {
      this.location.back();
    }
}
