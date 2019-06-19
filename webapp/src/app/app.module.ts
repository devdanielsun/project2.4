import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { MapService } from './mapbox/maps/map.service';

import {RouteRoutingModule} from './routing/routing.module';
import { AuthComponent } from './auth/auth.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    RouteRoutingModule,

  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})

export class AppModule { }
