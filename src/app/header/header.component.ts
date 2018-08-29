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
  private userName: string;
  private currentLang: string = "English";

  ngOnInit() {
  }

  constructor(
    private translate: TranslateService,
    private router: Router
  ) {
    this.translate.use('en');
  }

  /*setLang(lang: string) {
    this.translate.use(lang);
  }*/

  setCurrentLang(lang: string) {
    switch (lang) {
      case "it":
        this.currentLang = this.translate.instant("ITALIAN");
        break;
      case "en":
        this.currentLang = this.translate.instant("ENGLISH");
        break;
    }
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.setCurrentLang(lang);
  }

  logout() {
		sessionStorage.clear();
		this.router.navigate(['login']);
	}

	loggedIn() {
    return sessionStorage.length != 0;
  }

  getCurentPath() {
    return this.location.path();
  }

  toLogin() : void {
    this.router.navigate(['login']);
  }

  toAbout(): void {
    this.router.navigate(['about']);
  }

  toServices(): void {
    this.router.navigate(['view']);
  }

  toContact(): void {
    this.router.navigate(['contact']);
  }

  toHome(): void {
    this.router.navigate(['home']);
  }

  setUserName(): void {
    this.userName = sessionStorage.login;
  }
}
