import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, ApplicationRef } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LoginRegModule } from './login-reg/login-reg.module';
import { NgcFloatButtonModule } from 'ngc-float-button';
import { SliderModule } from 'angular-image-slider';
import {SlideshowModule} from 'ng-simple-slideshow';

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

//import { TranslateService } from './services/translate.service';
//import { TranslatePipe } from './translate.pipe';
//import { SharedModule } from './shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';

/*export function setupTranslateFactory(
  service: TranslateService): Function {
  return () => service.use('en');
}*/

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
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
    FooterComponent/*,
    TranslatePipe*/
  ],
  imports: [
    NgcFloatButtonModule,
    MatSelectModule,
    BrowserModule,
    BrowserAnimationsModule,
    SliderModule,
    SlideshowModule,
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    /*TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [
        TranslateService
      ],
      multi: true
    }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
