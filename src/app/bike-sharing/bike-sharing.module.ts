import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';

import { RackService } from './services/rack.service';
import { BikeService } from './services/bike.service';
import { RentService } from './services/rent.service';

import { DetailComponent, DialogRentBike } from './detail/detail.component';
import { ViewComponent } from './view/view.component';
import { InsertBikeComponent } from './insert-bike/insert-bike.component';
import { EditBikeComponent, EditBikeDialog } from './edit-bike/edit-bike.component';

import 'hammerjs';
import { ViewRentComponent } from './view-rent/view-rent.component';
import { EditRackComponent } from './edit-rack/edit-rack.component';

const routes: Routes = [
  { path: 'viewRent/:nameUser/:isAdmin', component: ViewRentComponent },
  { path: 'view', component: ViewComponent },
  { path: 'view/:admin', component: ViewComponent },
  { path: 'ins', component: InsertBikeComponent },
  { path: 'editBike/:id', component: EditBikeComponent },
  { path: 'editRack/:idRack', component: EditRackComponent },
//  { path: 'detail/:id/:codice/:latitudine/:longitudine/:nameUser', component: DetailComponent }
  { path: 'detail/:idRack/:nameUser', component: DetailComponent }
];

@NgModule({
  declarations: [
    DetailComponent,
    ViewComponent,
    DialogRentBike,
	  InsertBikeComponent,
    EditBikeComponent,
    EditBikeDialog,
    ViewRentComponent,
    EditRackComponent,
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
  entryComponents: [ ViewComponent, DialogRentBike, EditBikeDialog ],
  exports: [ RouterModule, MaterialModule],
  providers: [ RackService, BikeService, RentService ],
  bootstrap: []
})
export class BikeSharingModule { }
