import { Component, OnInit } from '@angular/core';

import {FormGroup,FormControl,Validators,FormsModule, } from '@angular/forms';
import {CommonService} from '../services/make-request.service';

import {Http,Response, Headers, RequestOptions } from '@angular/http';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-insert-db-component',
  templateUrl: './insert-db-component.component.html',
  styleUrls: ['./insert-db-component.component.css']
})
export class InsertDbComponentComponent implements OnInit {

  private valbutton: string;

  constructor(private newService :CommonService, private route: ActivatedRoute) {}

ngOnInit() {
  this.valbutton = "Save";
}

onSave = function(user,isValid: boolean) {
 user.mode= this.valbutton;
  this.newService.saveUser(user)
  .subscribe(data =>  {  alert(data.data);

    this.ngOnInit();
  }
  , error => this.errorMessage = error )

}

}
