import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BikeSharingModule } from '../bike-sharing/bike-sharing.module';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

import { LoginRegService } from './login-reg.service';

const appRoutesLogin: Routes = [
    //{ path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'registration', component: RegistrationComponent },
    { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BikeSharingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutesLogin),
    ShowHidePasswordModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBJyrufMXREcY074LM8z4jhx0JGl52KaHk'
    }),
  ],
  exports: [
    RegistrationComponent, LoginComponent
  ],
  providers: [LoginRegService],
  declarations: [RegistrationComponent, LoginComponent]
})
export class LoginRegModule { }
