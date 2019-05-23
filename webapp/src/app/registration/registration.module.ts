import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RegistrationComponent } from './registration.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [
  ],
  exports: [
    RegistrationComponent,
  ],
  bootstrap: [RegistrationComponent]
})

export class RegistrationModule { }
