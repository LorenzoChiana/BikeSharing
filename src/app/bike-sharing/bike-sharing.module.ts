import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
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

import { RentBikeComponent, BikeDialog, DialogRentBike, DialogComment, DialogAlert } from './rent-bike/rent-bike.component';
import { ViewComponent, ViewRackDialog } from './view/view.component';

import 'hammerjs';
import { ViewRentComponent } from './view-rent/view-rent.component';
import { EditRackComponent } from './edit-rack/edit-rack.component';
import { ViewCommentComponent } from './view-comment/view-comment.component';

import { NgcFloatButtonModule } from 'ngc-float-button';
import {MatExpansionModule} from '@angular/material/expansion';

//import {TranslateService} from '@ngx-translate/core';
//import { TranslateService } from '../services/translate.service'; 
//import { TranslatePipe } from './translate.pipe';
//import { SharedModule } from '../shared/shared.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

/*export function setupTranslateFactory(
  service: TranslateService): Function {
  return () => service.use('en');
}*/

const routes: Routes = [
  { path: 'view-rent', component: ViewRentComponent },
  { path: 'view', component: ViewComponent },
  { path: 'view/:admin', component: ViewComponent },
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
    DialogAlert,
    BikeDialog,

    EditRackComponent,
    ViewRentComponent,
    ViewCommentComponent/*,

    TranslatePipe*/
  ],
  imports: [
    NgbModule.forRoot(),
    MatExpansionModule,
    NgcFloatButtonModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBJyrufMXREcY074LM8z4jhx0JGl52KaHk'
    }),
    RouterModule.forChild(routes),
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  entryComponents: [ ViewComponent, ViewRackDialog, DialogRentBike, BikeDialog, DialogComment, DialogAlert],
  exports: [ RouterModule, MaterialModule],
  providers: [ 
    RackService,
    BikeService,
    RentService,
    CommentService,/*
    TranslateService,*/
    /*{
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [
        TranslateService
      ],
      multi: true
    }*/
  ],
  bootstrap: []
})
export class BikeSharingModule { }
