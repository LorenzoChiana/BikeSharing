import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
//import { TranslateService } from '../services/translate.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private location: Location;

  ngOnInit() {
  }

  constructor(private translate: TranslateService) {
    //console.log(translate.data);
  }

  /*setLang(lang: string) {
    this.translate.use(lang);
  }*/

  switchLanguage(lang: string) {
    //this.switchLanguage(lang);
    this.translate.use(lang);
  }

  logout(router:Router) {
		sessionStorage.clear();
		router.navigate(['/']);
	}

	loggedIn() {
    return sessionStorage.length != 0;
  }

  getCurentPath() {
    return this.location.path();
  }

}
