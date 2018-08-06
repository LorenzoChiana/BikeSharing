import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BikeSharingModule } from '../bike-sharing/bike-sharing.module';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

import { LoginRegService } from './login-reg.service';

import { TranslateService } from '../services/translate.service'; 
import { TranslatePipe } from './translate.pipe';

const appRoutesLogin: Routes = [
    //{ path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'registration', component: RegistrationComponent },
    { path: 'login', component: LoginComponent }
];

export function setupTranslateFactory(
  service: TranslateService): Function {
  return () => service.use('en');
}

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
  providers: [LoginRegService, TranslateService],
  declarations: [RegistrationComponent, LoginComponent, TranslatePipe]
})
export class LoginRegModule { }
