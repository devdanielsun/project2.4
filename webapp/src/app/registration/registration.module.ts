import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { RegistrationComponent } from './registration.component';
import { RegistrationRoutingModule } from './registration-routing.module';


@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegistrationRoutingModule
  ],
  providers: [
  ],
  bootstrap: [RegistrationComponent]
})

export class RegistrationModule { }
