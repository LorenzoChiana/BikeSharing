import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

import { InsertModule } from '../insert-db/insert-db.module';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const appRoutesLogin: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'registration', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [
    CommonModule,
    InsertModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutesLogin)
  ],
  exports: [
    RegistrationComponent, LoginComponent
  ],
  declarations: [RegistrationComponent, LoginComponent]
})
export class LoginRegModule { }
