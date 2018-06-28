import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRegModule } from './login-reg/login-reg.module';

import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';

const appRoutesMain: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
	BrowserModule,
  LoginRegModule,
  AgmCoreModule.forRoot({
    apiKey: 'AIzaSyBJyrufMXREcY074LM8z4jhx0JGl52KaHk'
  }),
  RouterModule.forRoot(appRoutesMain),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
