import { Injectable } from '@angular/core';
import { environment } from './environments/default';

import { GeoJson } from './map';
import * as mapboxgl from 'mapbox-gl';

@Injectable()
export class MapService {

  constructor() {
    //console.log(environment.mapbox.accessToken);
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }
}
