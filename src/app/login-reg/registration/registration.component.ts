import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginRegService } from '../login-reg.service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  private registerForm: FormGroup;

  private show: boolean = false;
  private type: string = "password";

  private submitted: boolean;

  constructor(private formBuilder: FormBuilder, private loginRegService : LoginRegService, private route :Router) { }

  ngOnInit() {
    this.submitted = false;

    this.registerForm = this.formBuilder.group({
        nomeUtente: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    var name : string = this.f.nomeUtente.value;
    var password : string = this.f.password.value;

    this.route.navigate(['view']);
  }

}
