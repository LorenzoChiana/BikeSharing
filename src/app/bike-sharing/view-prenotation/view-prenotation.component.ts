import { Component, OnInit } from '@angular/core';

import { PrenotationService } from '../services/make-prenotation.service';

@Component({
  selector: 'app-view-prenotation',
  templateUrl: './view-prenotation.component.html',
  styleUrls: ['./view-prenotation.component.css']
})
export class ViewPrenotationComponent implements OnInit {

  private RepData;

  constructor(private prenotationService :PrenotationService) { }

  ngOnInit() {
    this.prenotationService.getAllPrenotation().subscribe(data =>  this.Repdata = data);
  }

}
