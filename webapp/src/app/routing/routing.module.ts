import { MapBoxComponent } from './../mapbox/maps/map-box/map-box.component';
import { LoginComponent } from './../login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService as AuthGuard } from '../auth/guard.service';


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
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]

})


export class RouteRoutingModule {
}
