import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapBoxComponent } from './maps/map-box/map-box.component';

@NgModule({
  declarations: [MapBoxComponent],
  exports: [MapBoxComponent],
  imports: [
    CommonModule
  ]
})
export class MapboxModule { }
