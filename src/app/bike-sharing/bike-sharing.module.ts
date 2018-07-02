import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonService } from './services/make-request.service';

import { DetailComponent } from './detail/detail.component';
import { ViewComponent } from './view/view.component';

import { InsertBikeComponent } from './insert-bike/insert-bike.component';
import { EditBikeComponent } from './edit-bike/edit-bike.component';

const routes: Routes = [
  { path: 'view', component: ViewComponent },
  { path: 'view/:admin', component: ViewComponent },
  { path: 'ins', component: InsertBikeComponent },
  { path: 'edit/:id/:nome/:latitudine/:longitudine', component: EditBikeComponent },
  { path: 'detail/:id/:nome/:latitudine/:longitudine', component: DetailComponent }
];

@NgModule({
  declarations: [
    DetailComponent,
    ViewComponent,
	  InsertBikeComponent,
    EditBikeComponent,
  ],
  imports: [
    NgbModule.forRoot(), BrowserModule,HttpModule,FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBJyrufMXREcY074LM8z4jhx0JGl52KaHk'
    }),
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ],
  providers: [CommonService],
  bootstrap: []
})
export class BikeSharingModule { }
