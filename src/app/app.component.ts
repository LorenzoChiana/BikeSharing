import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

 	constructor(router:Router) {
    	router.navigate(['/home']);
 	}

	ngOnInit(){}

	logout(router:Router) {
	  	sessionStorage.clear();
	    router.navigate(['/']);
	}

	loggedIn() {
    	return sessionStorage.length != 0;
  	}
}
