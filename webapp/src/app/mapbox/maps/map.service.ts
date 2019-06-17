import { Injectable } from '@angular/core';
import { environment } from './environments/default';
//import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
//import { AngularFireDatabase, AngularFireList } from '@angular/fire/databases';

import { GeoJson } from './map';
import * as mapboxgl from 'mapbox-gl';

@Injectable()
export class MapService {

  constructor() {
    console.log(environment.mapbox.accessToken);
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  private list: string[] = ['!in', 'NAME', 'Antarctica', 'Netherlands'];

  getVisitedCountries() {
    console.log(this.list)
    return this.list;
  }

  addCountry(data: string): void {
    if (!this.list.includes(data)) {
      this.list.push(data);
    }
  }

  removeCountry(key: string) {

  }
}
