
import { ProfileService } from './../../../profile/profile.service';
import { AuthService } from './../../../auth/auth.service';
import { MapService } from './../map.service';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { GeoJson, FeatureCollection, MapI, GetMapResponce } from '../map';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProfileI } from 'src/app/profile/profile';


@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css']
})

export class MapBoxComponent implements OnInit {
  /// default settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/danielgeerts/cjx0c0f3x06yt1cs3yfskhjhv';

  private landList: string[] = ['!in', 'NAME', 'Antarctica'];


  private lat: any;
  private long: any;

  locations: GetMapResponce;
  user: ProfileI['message'];


  constructor(private route: ActivatedRoute, private mapService: MapService, private auth: AuthService, private profile: ProfileService) { }

  ngOnInit() {
    this.initializeMap();
    const uID: string = localStorage.getItem('ID');
    /*this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
          return uID = params.get('id') ? params.get('id') : localStorage.getItem('ID');
        }
      )
    );*/

    this.mapService.getMap(uID).subscribe(
      (res) => this.locations = res,
      (err) => console.log(err),
      () => console.log('done!')
    );

    this.profile.getUser(localStorage.getItem('ID')).subscribe(
      (res) => this.user = res.message,
      (err) => console.log(err),
      () => console.log('done!')
    );
  }

  private initializeMap() {
    this.buildMap();
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      center: [10, 45],
      zoom: 1,
      minZoom: 1,
      maxZoom: 9,
    });

    /// Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', (event) => {
      this.map.addSource('everycountry', {
        type: 'vector',
        url: 'mapbox://danielgeerts.0e8dwloy',
      });

      this.map.addLayer({
        id: 'country-layer',
        type: 'fill',
        source: 'everycountry',
        'source-layer': 'ne_10m_admin_0_countries-8bj9st',
        paint: {
          'fill-outline-color' : 'rgba(0,0,0,0.75)',
          'fill-color':  'rgba(139,0,139,0.5)'
        },
        filter: ['!in', 'NAME', 'Antarctica'],
      }, 'holiday_overlay');

      for (const loc of this.locations.message) {
        if (loc.country && !this.landList.includes(loc.country)) {
          this.landList.push(loc.country);
        }
        this.createNewPinpoint(this.map, loc.country, loc.longitude, loc.latitude, loc.date_time, false);
      }
      console.log(this.landList);
      this.map.setFilter('country-layer', this.landList);

      this.map.on('click', (e: any) => {
        // set bbox as 5px reactangle area around clicked point

        const bbox = [[e.point.x - 1, e.point.y - 1], [e.point.x + 1, e.point.y + 1]];

        const features = this.map.queryRenderedFeatures(bbox, { layers: ['country-layer'] });

        // Add new pinpoint to the map
        this.createNewPinpoint(this.map, features[0].properties.NAME, e.lngLat.lng, e.lngLat.lat, null, true);

        for (const f of features) {
          console.log('clickedOn: ' + f.properties.NAME);
          if (!this.landList.includes(f.properties.NAME)) {
            this.landList.push(f.properties.NAME);
          }
        }
        this.map.setFilter('country-layer', this.landList);
      });
    });
  }

  createNewPinpoint(map: any, landName: any, lng: string, lat: string, date: number, addToDB: boolean) {
    let randomIMG = '../../../../assets/';

    randomIMG += this.getRandomBoolean() ? 'blue-marker.png' : 'red-marker.png';

    const date_ms = date ? date : new Date().getTime();
    const newPoint: MapI = {
      user: {
        id: this.user.id,
        name: this.user.name,
        lastname: this.user.lastname,
        email: this.user.email,
        admin: this.user.admin,
      },
      longitude: lng,
      latitude: lat,
      date_time: date_ms,
      country: landName ? landName : 'No land',
    };

    if (addToDB === true) {
      console.log(newPoint)
      this.mapService.postMap(localStorage.getItem('ID'), newPoint).subscribe(
        (res) => console.log(res),
        (err) => console.log(err),
        () => console.log('Destination added to DB!')
      );
    }

    const pinname = 'pinpoint_' + this.user.id + '_' + date_ms;
    console.log("Create new marker on -> " + pinname);
    map.loadImage(randomIMG, function(error, image) {
      if (error) { throw error; }
      map.addImage(pinname, image);
      map.addLayer({
        id: 'point' + lng + lat,
        type: 'symbol',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [lng, lat]
              }
            }]
          }
        },
        layout: {
          'icon-image': pinname,
          'icon-size': 0.75,
        }
      });
    });
  }

  getRandomBoolean(): boolean {
    return Math.random() >= 0.5;
  }
  private getlocation() {
    // locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        console.log (position.coords.latitude, position.coords.longitude)
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        this.addlocationpin();
      });
    }
  }
//  Mapbox buttons
  addlocationpin() {
    if (this.long && this.lat) {
    this.createNewPinpoint(this.map,"No land", this.long, this.lat, new Date().getTime(), true);
    } else {
    console.log('Your location has not been shared');
    }}
}
