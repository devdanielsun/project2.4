import { Injectable } from '@angular/core';
import { environment } from './environments/default';

import { GeoJson } from './map';
import * as mapboxgl from 'mapbox-gl';
import { Observable } from 'rxjs';

@Injectable()
export class MapService {

  constructor() {
    //console.log(environment.mapbox.accessToken);
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  getLocations(id: string) {//: Observable<string[]> {
    let temp = 'Haal de map van ' + id + ' op';
    console.log(temp);
    return temp;
  }
}
