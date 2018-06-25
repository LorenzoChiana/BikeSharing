import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { InsertModule } from './insert-db/insert-db.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
	BrowserModule,
	InsertModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
