import { MapboxModule } from './../mapbox/mapbox.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { LoginModule } from '../login/login.module';
import { GuardService } from './guard.service';
import { Interceptor } from './interceptor.service';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoginModule,
    MapboxModule
  ],
  providers: [ AuthService,
    GuardService,
    Interceptor
  ]
})
export class AuthModule { }
