import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

import { BikeSharingModule } from '../bike-sharing/bike-sharing.module';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ShowHidePasswordModule } from 'ngx-show-hide-password';

const appRoutesLogin: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'registration', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BikeSharingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutesLogin),
    ShowHidePasswordModule.forRoot(),
  ],
  exports: [
    RegistrationComponent, LoginComponent
  ],
  declarations: [RegistrationComponent, LoginComponent]
})
export class LoginRegModule { }
