import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MapBoxComponent} from './maps/map-box/map-box.component';


const routes: Routes = [
  {
    path: '',
    component: MapBoxComponent
  },
  /*{
    path: ':id',
    component: MapBoxComponent
  },*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapboxRoutingModule { }
