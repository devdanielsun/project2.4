import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RegistrationModule } from './registration/registration.module';
import { LoginModule } from './login/login.module';
import { MapboxModule } from './mapbox/mapbox.module';
import { MapService } from './mapbox/maps/map.service'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RegistrationModule,
    LoginModule,
    MapboxModule,
  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
