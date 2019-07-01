import { AuthService } from './auth/auth.service';

import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupModule } from './popup/popup.module';
import { AppComponent } from './app.component';
import { MapService } from './mapbox/maps/map.service';
import { RouteRoutingModule } from './routing/routing.module';
import { AuthComponent } from './auth/auth.component';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { GuardService } from './auth/guard.service';
import { MenuComponent } from './menu/menu.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { Interceptor } from './auth/interceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MenuComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    PopupModule,
    BrowserModule,
    RouteRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],

  providers: [MapService, GuardService, AuthService,
    {provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true
    },
    {provide: LocationStrategy,
     useClass: HashLocationStrategy
    },
  ],

  bootstrap: [AppComponent]
})

export class AppModule {
}
