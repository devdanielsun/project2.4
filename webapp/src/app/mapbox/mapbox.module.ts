import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapBoxComponent } from './maps/map-box/map-box.component';
import { MapboxRoutingModule } from './mapbox-routing.module';

@NgModule({
  declarations: [MapBoxComponent],
  exports: [MapBoxComponent],
  imports: [
    CommonModule,
    MapboxRoutingModule
  ]
})
export class MapboxModule { }
