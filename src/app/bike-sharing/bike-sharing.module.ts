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
import { CommentService } from './services/comment.service';

import { RentBikeComponent, DialogRentBike, DialogComment } from './rent-bike/rent-bike.component';
import { ViewComponent, ViewRackDialog } from './view/view.component';
import { InsertBikeComponent } from './insert-bike/insert-bike.component';
import { EditBikeComponent, EditBikeDialog } from './edit-bike/edit-bike.component';

import 'hammerjs';
import { ViewRentComponent } from './view-rent/view-rent.component';
import { EditRackComponent } from './edit-rack/edit-rack.component';
import { ViewCommentComponent } from './view-comment/view-comment.component';

const routes: Routes = [
  { path: 'view-rent/:nameUser/:isAdmin', component: ViewRentComponent },
  { path: 'view', component: ViewComponent },
  { path: 'view/:admin', component: ViewComponent },
  //{ path: 'ins', component: InsertBikeComponent },
  { path: 'edit-bike/:idBike', component: EditBikeComponent },
  { path: 'edit-rack/:idRack', component: EditRackComponent },
  { path: 'rent-bike/:idRack', component: RentBikeComponent },
  { path: 'view-comment/:codeBike', component: ViewCommentComponent },
];

@NgModule({
  declarations: [
    RentBikeComponent,
    ViewComponent,
    ViewRackDialog,
    DialogRentBike,
    DialogComment,
	  InsertBikeComponent,
    EditBikeComponent,
    EditBikeDialog,
    ViewRentComponent,
    EditRackComponent,
    ViewCommentComponent,
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
  entryComponents: [ ViewComponent, ViewRackDialog, DialogRentBike, EditBikeDialog, DialogComment],
  exports: [ RouterModule, MaterialModule],
  providers: [ RackService, BikeService, RentService, CommentService ],
  bootstrap: []
})
export class BikeSharingModule { }
