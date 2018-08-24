import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import {Observable} from 'rxjs/Rx';

import {LoginRegService} from '../login-reg.service'
import { User } from '../User'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginRegService]
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private submitted: boolean;
  private un_err: boolean;
  private pw_err: boolean;

  lat: number = 51.678418;
  lng: number = 7.809007;

  private errorMessage;

  constructor(private formBuilder: FormBuilder, private loginRegService : LoginRegService, private route :Router) { }

  ngOnInit() {
    this.submitted = false;
    this.un_err = false;
    this.pw_err = false;

    this.loginForm = this.formBuilder.group({
        nomeUtente: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return 0;
    }

    var name : string = this.f.nomeUtente.value;
    var password : string = this.f.password.value;

    this.loginRegService.findUser(name).subscribe(data => {
      if (data.nomeUtente != name) {
        this.un_err = true;
        return 1;
      } else if (data.passwordUtente != password) {
        this.pw_err = true;
        return 2;
      } else {
        sessionStorage.setItem('login', name);
        sessionStorage.setItem('isAdmin', 'false');

        //sessionStorage.removeItem('isAdmin');

        if (data.tipoUtente == "admin") {
          sessionStorage.setItem('isAdmin', 'true');
          this.route.navigate(['view', 'admin'])
        } else {
          this.route.navigate(['view'])
        }
      }
    });
  }

  clickRegister() {
    this.route.navigate(['registration']);
  }

  isWrongUserName() {
    return this.un_err;
  }

  isWrongPassword() {
    return this.pw_err;
  }
}
