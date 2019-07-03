import { ConfigService } from './../../config.service';
import { Injectable } from '@angular/core';
import { environment } from './environments/default';

import { MapI, DestinationsResponce } from './map';
import * as mapboxgl from 'mapbox-gl';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable()
export class MapService {

  constructor(private httpClient: HttpClient, private config: ConfigService) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  getMap(id: string): Observable<DestinationsResponce> {
    const url = this.config.getBackendUrl() + '/user/' + id + '/map';
    return this.httpClient.get<DestinationsResponce>(url);
  }

  postMap(id: string, map: MapI): Observable<DestinationsResponce> {
    const url = this.config.getBackendUrl() + '/user/' + id + '/map';
    return this.httpClient.post<DestinationsResponce>(url, JSON.stringify(map)).pipe(tap(
      (res: DestinationsResponce) => {
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
