import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PrenotationService } from '../services/make-prenotation.service';

import { Prenotazione } from '../prenotazione'

@Component({
  selector: 'app-view-prenotation',
  templateUrl: './view-prenotation.component.html',
  styleUrls: ['./view-prenotation.component.css']
})
export class ViewPrenotationComponent implements OnInit {

  private isAdmin : boolean;
  private nameUser : string;

  private repData : Prenotazione[];

  constructor(private prenotationService :PrenotationService,
    private location: Location,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      this.isAdmin = params.isAdmin;
      this.nameUser = params.nameUser;
    });

    if (this.isAdmin == true) {
      this.prenotationService.getAllPrenotation().subscribe(data =>  this.repData = data);
    } else {
      this.prenotationService.getUserPrenotation(this.nameUser).subscribe(data =>  this.repData = data);
    }
  }

  goBack(): void {
    this.location.back();
  }

}
