import { MapBoxComponent } from './../mapbox/maps/map-box/map-box.component';
import { LoginComponent } from './../login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService as AuthGuard } from '../auth/guard.service';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: '../login/login.module#LoginModule',
  },
  {
    path: 'registration',
    loadChildren: '../registration/registration.module#RegistrationModule',
  },
  {
    path: 'unauthorized',
    loadChildren: '../redirect/unauthorized/unauthorized.module#UnauthorizedModule',
  },
  {
    path: 'map',
    loadChildren: '../mapbox/mapbox.module#MapboxModule',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    loadChildren: '../redirect/notfound/notfound.module#NotfoundModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]

})


export class RouteRoutingModule {
}
