import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import {LoginRegService} from '../login-reg.service'

import { User } from '../User'

import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginRegService]
})
export class LoginComponent implements OnInit {
  //constructor(private logService :LoginService, private route: ActivatedRoute) {} da riprendere in avanti

  private loginForm: FormGroup;
  private submitted: boolean;

    lat: number = 51.678418;
    lng: number = 7.809007;

    private errorMessage;

    private repdata;

  constructor(private formBuilder: FormBuilder, private loginRegService : LoginRegService, private route :Router) { }

  ngOnInit() {

    this.submitted = false;

    this.loginForm = this.formBuilder.group({
        nomeUtente: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {

    this.submitted = true;

    if (this.loginForm.invalid) {
      //alert("invalid form");
      return;
    }

    var name : string = this.f.nomeUtente.value;
    var password : string = this.f.password.value;

    this.loginRegService.findUser(name).subscribe(data => {
      this.repdata = data;
    });

    if (this.repdata.nomeUtente != name) {
      alert("nome utente sconosciuto!!");
    } else if (this.repdata.passwordUtente != password) {
      alert("password errata !!");
    } else {
      if (this.repdata.tipoUtente == "admin") {
        this.route.navigate(['view', 'admin'])
      } else {
        localStorage.setItem('login', name);
        this.route.navigate(['view'])
      }
    }
  }

  clickRegister() {
    this.route.navigate(['registration']);
  }
}
