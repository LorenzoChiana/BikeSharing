import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LoginRegModule } from './login-reg/login-reg.module';
import { NgcFloatButtonModule } from 'ngc-float-button';

import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatSelectModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';


import { TranslateService } from './services/translate.service';
import { TranslatePipe } from './translate.pipe';

import { HttpClientModule } from '@angular/common/http';

export function setupTranslateFactory(
  service: TranslateService): Function {
  return () => service.use('en');
}

const appRoutesMain: Routes = [
    /*{ path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },*/

    {
      path: '',
      component: HomeComponent,
      /*children: [
        {
          path: '',
          component: HomeComponent
        },
        {
          path: 'home',
          component: HomeComponent
        },
        {
          path: 'about',
          component: AboutComponent
        },
        {
          path: 'contact',
          component: ContactComponent
        }
      ]*/
    },

    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    HeaderComponent,
    TranslatePipe
  ],
  imports: [
    NgcFloatButtonModule,
    MatSelectModule,
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    LoginRegModule,
    RouterModule.forRoot(appRoutesMain),
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBJyrufMXREcY074LM8z4jhx0JGl52KaHk'
    }),
  ],
  providers: [
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [
        TranslateService
      ],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
