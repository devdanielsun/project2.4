import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { MenuComponent } from './menu/menu.component';


import { RouteRoutingModule } from './routing/routing.module';
import { MapService } from './mapbox/maps/map.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MenuComponent,
  ],
  imports: [
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouteRoutingModule,
  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})

export class AppModule { }
