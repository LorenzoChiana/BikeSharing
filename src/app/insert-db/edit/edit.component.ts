import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import {CommonService} from '../services/make-request.service';
import { Location } from '@angular/common';

import {User} from '../user'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  private valbutton: string;
  private user: User;

  private name: string;
  private address: string;

  constructor(private newService :CommonService, private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    this.valbutton = "Update";

    this.route.params.subscribe((params) => this.user =
      new User(params.id, params.name, params.address));

    this.name = this.user.name;
    this.address = this.user.address;
  }

  edit = function() {
    this.user.name = this.name;
    this.user.address = this.address;
    this.user.mode = this.valbutton;

     this.newService.saveUser(this.user)
     .subscribe(data =>  {  alert(data.data);
     }
     , error => this.errorMessage = error )
  }

  goBack(): void {
    this.location.back();
  }
}
