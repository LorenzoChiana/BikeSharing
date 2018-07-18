import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private location: Location;

  ngOnInit() {
  }

  logout(router:Router) {
		sessionStorage.clear();
		router.navigate(['/']);
	}

	loggedIn() {
    return sessionStorage.length != 0;
  }

  goBack(): void {
    this.location.back();
  }

}
