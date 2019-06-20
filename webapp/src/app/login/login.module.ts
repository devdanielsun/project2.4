import { LoginRoutingModule } from './login-routing.module';
import { AuthService } from './../auth/auth.service';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';


import { LoginComponent } from './login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ],
  providers: [
    AuthService,

  ],
  bootstrap: [LoginComponent]
})

export class LoginModule {

}
