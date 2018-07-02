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

  private loginForm: FormGroup;

  lat: number = 51.678418;
    lng: number = 7.809007;

  constructor(private formBuilder: FormBuilder, private loginRegService : LoginRegService, private route :Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        nomeUtente: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) {
      alert("invalid form")
      return;
    }

    var name : string = this.f.nomeUtente.value;
    var password : string = this.f.password.value;

    //this.route.navigate(['view']);
    this.route.navigate(['view', 'admin']);
  }

  clickRegister() {
    this.route.navigate(['registration']);
  }
}
