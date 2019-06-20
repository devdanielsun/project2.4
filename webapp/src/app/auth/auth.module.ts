import { MapboxModule } from './../mapbox/mapbox.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { LoginModule } from '../login/login.module';
import { Interceptor } from './intercepter.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GuardService } from './guard.service';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    //AuthRoutingModule,
    FormsModule,
    HttpClientModule,
    LoginModule,
    MapboxModule
  ],
  providers: [ AuthService,
    GuardService,
    {provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true,
  }]
})
export class AuthModule { }
