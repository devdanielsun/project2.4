import { UserI } from './../../jwt/user';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
export interface MapI {
  user: {
    id: number;
    name: string;
    lastname: string;
    email: string;
    admin: boolean;
  };
  longitude: string;
  latitude: string;
  date_time: number;
  country: string;
}

export interface DestinationsResponce {
  userId: number;
  tokenValid: boolean;
  newToken: string;
  admin: boolean;
  message: [
    {
      id: number;
      private_level: number;
      longitude: string;
      latitude: string;
      date_time: number;
      country: string;
    }
  ];
}

export interface IGeometry {
    type: string;
    coordinates: number[];
}

export interface IGeoJson {
    type: string;
    geometry: IGeometry;
    properties?: any;
    $key?: string;
}

export class GeoJson implements IGeoJson {
  type = 'Feature';
  geometry: IGeometry;

  constructor(coordinates, public properties?) {
    this.geometry = {
      type: 'Point',
      coordinates: coordinates
    }
  }
}

export class FeatureCollection {
  type = 'FeatureCollection'
  constructor(public features: Array<GeoJson>) {}
}
