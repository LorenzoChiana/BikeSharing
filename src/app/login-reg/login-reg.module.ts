import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BikeSharingModule } from '../bike-sharing/bike-sharing.module';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

import { LoginRegService } from './login-reg.service';

/*import { TranslateService } from '../services/translate.service'; 
import { TranslatePipe } from './translate.pipe';*/

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const appRoutesLogin: Routes = [
    //{ path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'registration', component: RegistrationComponent },
    { path: 'login', component: LoginComponent }
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule,
    BikeSharingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutesLogin),
    ShowHidePasswordModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    RegistrationComponent, LoginComponent
  ],
  providers: [LoginRegService],
  declarations: [RegistrationComponent, LoginComponent]
})
export class LoginRegModule { }
