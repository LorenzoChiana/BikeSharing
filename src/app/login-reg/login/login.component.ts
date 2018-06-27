import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import {LoginService} from '../login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //constructor(private logService :LoginService, private route: ActivatedRoute) {} da riprendere in avanti

  constructor(private route :Router) {}

  ngOnInit() {
  }

  onSubmit = function(userLogin, isValid:boolean) {
    this.route.navigate(['ins']);
  }
}
