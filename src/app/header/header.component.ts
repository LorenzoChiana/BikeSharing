import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  	ngOnInit() {
  	}

  	logout(router:Router) {
		sessionStorage.clear();
		router.navigate(['/']);
	}

	loggedIn() {
    	return sessionStorage.length != 0;
  	}

}
