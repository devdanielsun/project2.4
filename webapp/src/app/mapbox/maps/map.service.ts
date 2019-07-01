import { AuthService } from './../../auth/auth.service';
import { ProfileService } from './../../profile/profile.service';
import { Injectable } from '@angular/core';
import { environment } from './environments/default';

import { GeoJson, MapI, MapResponce, GetMapResponce } from './map';
import * as mapboxgl from 'mapbox-gl';
import { Observable, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MappingsContext } from 'source-list-map';
import { tap } from 'rxjs/operators';

@Injectable()
export class MapService {

  BackendCasper = 'http://csprl.nl:8088';
  constructor(private httpClient: HttpClient) {
    //console.log(environment.mapbox.accessToken);
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  getMap(id: string): Observable<GetMapResponce> {
    return this.httpClient.get<GetMapResponce>(`${this.BackendCasper}/user/${id}/map`);
  }

  postMap(id: string, map: MapI): Observable<MapResponce> {
    return this.httpClient.post<MapResponce>(`${this.BackendCasper}/user/${id}/map`, JSON.stringify(map)).pipe(tap(
      (res: MapResponce) => {
        if (res) {
          console.log(res);
          console.log('Locations is uploaded');
        }
      },
      (err) => {
        console.log(err);
      }
    ));
  }
}
