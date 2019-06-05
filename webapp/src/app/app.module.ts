import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { MapboxModule } from './mapbox/mapbox.module';
import { MapService } from './mapbox/maps/map.service'

import {RouteRoutingModule} from './routing/routing.module';
import { Routes, RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MapboxModule,
    RouteRoutingModule,

  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})

export class AppModule { }
