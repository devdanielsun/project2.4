import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {RouteRoutingModule} from './routing/routing.module';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    // RouterModule, <- Kan misschien wel weg
    RouteRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
