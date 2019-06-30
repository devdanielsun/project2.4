import { Injectable } from '@angular/core';
import { environment } from './environments/default';

import { GeoJson, MapI } from './map';
import * as mapboxgl from 'mapbox-gl';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MappingsContext } from 'source-list-map';

@Injectable()
export class MapService {

  BackendCasper: 'http://csprl.nl:8088';
  constructor(private httpClient: HttpClient) {
    //console.log(environment.mapbox.accessToken);
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  /* need to create a body in MapI located in  map.ts
  getMap(id: string): Observable<{MapI}> {
    return this.httpClient.get<MapI>(`${this.BackendCasper}/user/${id}/map`);
  }
  */

  postMap(id: string, map: MapI) {
    this.httpClient.post<MapI>(`${this.BackendCasper}/user/${id}/map`, map);
  }

  getLocations(id: string) {//: Observable<string[]> {
    let temp = 'Haal de map van ' + id + ' op';
    console.log(temp);
    return temp;
  }
}
