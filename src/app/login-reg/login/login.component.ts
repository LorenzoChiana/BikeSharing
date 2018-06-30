import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import {LoginRegService} from '../login-reg.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //constructor(private logService :LoginService, private route: ActivatedRoute) {} da riprendere in avanti

  lat: number = 51.678418;
    lng: number = 7.809007;

  constructor(private route :Router) {}

  ngOnInit() {
  }

  onSubmit = function(userLogin, isValid:boolean) {

    /*
    onSubmit = function(userLogin, isValid:boolean) {
      this.route.navigate(['ins']);
    }
    */

    // navigate(['./', { outlets: { 'list-outlet': ['list', param1, param2]} }]);

    this.route.navigate(['view', 'admin']);
  }
}
