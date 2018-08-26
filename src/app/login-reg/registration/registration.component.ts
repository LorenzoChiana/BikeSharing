import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginRegService } from '../login-reg.service'
import { User } from '../User'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  private registerForm: FormGroup;

  private show: boolean = false;
  private submitted: boolean = false;
  private type: string = "password";
  private isUserNamePresent: boolean = false;

  private errorMessage;

  constructor(private formBuilder: FormBuilder, private loginRegService : LoginRegService, private route :Router) { }

  ngOnInit() {
    this.submitted = false;
    this.isUserNamePresent = false;
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

    var newUser: User = new User(name, password, "user");

    this.loginRegService.findUser(name).subscribe(data => {
      if (data.nomeUtente != name) {
          this.loginRegService.saveUser(newUser)
            .subscribe(data => { alert(data.data) }, error => this.errorMessage = error);

          this.route.navigate(['view']);
      } else {
        // utente già presente
        this.isUserNamePresent = true;
      }
    });
    
  }

}
