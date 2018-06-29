import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRegModule } from './login-reg/login-reg.module';

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';

const appRoutesMain: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
	BrowserModule,
  LoginRegModule,
  RouterModule.forRoot(appRoutesMain),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
