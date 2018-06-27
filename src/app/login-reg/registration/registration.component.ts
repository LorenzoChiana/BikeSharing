import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private route :Router) { }

  ngOnInit() {
  }

  onRegister = function(userLogin, isValid:boolean) {
    this.route.navigate(['ins']);
  }
}
