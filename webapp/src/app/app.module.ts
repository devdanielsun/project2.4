import { AuthService } from './auth/auth.service';


import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { MapService } from './mapbox/maps/map.service';
import { RouteRoutingModule } from './routing/routing.module';
import { AuthComponent } from './auth/auth.component';
import { CommonModule } from '@angular/common';
import { GuardService } from './auth/guard.service';




@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    BrowserModule,
    RouteRoutingModule,
  ],
  providers: [MapService, GuardService, AuthService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
