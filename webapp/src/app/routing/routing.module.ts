import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


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
  },
  {
    path: 'map',
    loadChildren: '../mapbox/mapbox.module#MapboxModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})


export class RouteRoutingModule {
}
