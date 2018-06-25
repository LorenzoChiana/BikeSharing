import { Component, OnInit } from '@angular/core';

import {CommonService} from '../services/make-request.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(private newService :CommonService,
    private location: Location,
    private route: ActivatedRoute) {   }
   Repdata;

  ngOnInit() {
    this.viewUsers()
  }

  viewUsers = function() {
    this.newService.GetUser().subscribe(data =>  this.Repdata = data)
  }

  goBack(): void {
    this.location.back();
  }
}
