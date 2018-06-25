import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule, Routes } from '@angular/router';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import {CommonService} from './services/make-request.service';

import { InsertDbComponentComponent } from './insert-db-component/insert-db-component.component';
import { DetailComponent } from './detail/detail.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: '', redirectTo: '/ins', pathMatch: 'full' },
  { path: 'ins', component: InsertDbComponentComponent },
  { path: 'view', component: ViewComponent },
  { path: 'detail/:id', component: DetailComponent }
];

@NgModule({
  declarations: [
    InsertDbComponentComponent,
    DetailComponent,
    ViewComponent
  ],
  imports: [
    NgbModule.forRoot(), BrowserModule,HttpModule,FormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  providers: [CommonService],
  bootstrap: [InsertDbComponentComponent]
})
export class InsertModule { }
