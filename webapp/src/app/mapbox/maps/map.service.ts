import { Injectable } from '@angular/core';
import { environment } from './environments/default';
//import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
//import { AngularFireDatabase, AngularFireList } from '@angular/fire/databases';

import { GeoJson } from './map';
import * as mapboxgl from 'mapbox-gl';

@Injectable()
export class MapService {

  constructor() { //private db: AngularFireDatabase) {
    console.log(environment.mapbox.accessToken)
    mapboxgl.accessToken = environment.mapbox.accessToken
  }

  getMarkers() { //: AngularFireList<any> {
    //return this.db.list('/markers')
    console.log("Get Markers")
  }

  createMarker(data: GeoJson) {
    //return this.db.list('/markers').push(data)
    console.log("Create Marker: " + data)
  }

  removeMarker($key: string) {
    //return this.db.object('/markers/' + $key).remove()
    console.log("Remove Marker: " + $key)
  }
}
