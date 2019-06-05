import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginModule} from '../login/login.module';
import {RegistrationModule} from '../registration/registration.module';
import {LoginComponent} from '../login/login.component';


const routes: Routes = [
  { path: '',
    redirectTo: 'login',
    pathMatch:  'full'},
  {
    path: 'login',
    loadChildren: '../login/login.module#LoginModule',
  },
  {
    path: 'registration',
    loadChildren: '../registration/registration.module#RegistrationModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class RouteRoutingModule {
}
