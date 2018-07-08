import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';

import { BikeService } from './services/make-request.service';
import { PrenotationService } from './services/make-prenotation.service';

import { DetailComponent } from './detail/detail.component';
import { ViewComponent, DialogRentBike } from './view/view.component';
import { InsertBikeComponent } from './insert-bike/insert-bike.component';
import { EditBikeComponent } from './edit-bike/edit-bike.component';

import 'hammerjs';
import { ViewPrenotationComponent } from './view-prenotation/view-prenotation.component';

const routes: Routes = [
  { path: 'viewPrenotation/:nameUser/:isAdmin', component: ViewPrenotationComponent },
  { path: 'view', component: ViewComponent },
  { path: 'view/:admin', component: ViewComponent },
  { path: 'ins', component: InsertBikeComponent },
  { path: 'edit/:id/:nome/:latitudine/:longitudine/:stato', component: EditBikeComponent },
  { path: 'detail/:id/:nome/:latitudine/:longitudine/:stato', component: DetailComponent }
];

@NgModule({
  declarations: [
    DetailComponent,
    ViewComponent,
    DialogRentBike,
	  InsertBikeComponent,
    EditBikeComponent,
    ViewPrenotationComponent,
  ],
  imports: [
    NgbModule.forRoot(), BrowserModule,HttpModule,FormsModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBJyrufMXREcY074LM8z4jhx0JGl52KaHk'
    }),
    RouterModule.forChild(routes),
    MaterialModule
  ],
  entryComponents: [ ViewComponent, DialogRentBike ],
  exports: [ RouterModule, MaterialModule],
  providers: [ BikeService, PrenotationService ],
  bootstrap: []
})
export class BikeSharingModule { }
