import { MapService } from './../map.service';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { GeoJson, FeatureCollection } from '../map';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css']
})

export class MapBoxComponent implements OnInit {
  /// default settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/danielgeerts/cjx0c0f3x06yt1cs3yfskhjhv';

  private list: string[] = ['!in', 'NAME', 'Antarctica'];

  locations$: Observable<string>;

  constructor(private route: ActivatedRoute, private mapService: MapService) { }

  ngOnInit() {
    this.initializeMap();
    this.locations$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.mapService.getLocations(params.get('id') ? params.get('id') : localStorage.getItem('ID'))
      )
    );
  }

  private initializeMap() {
    /// locate the user
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
        console.log (position.coords.latitude, position.coords.longitude);
      });
    }

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


      this.map.on('click', (e: any) => {
        // Add new pinpoint to the map
        this.createNewPinpoint(this.map, e.lngLat.lng, e.lngLat.lat);

        // set bbox as 5px reactangle area around clicked point
        const bbox = [[e.point.x - 3, e.point.y - 3], [e.point.x + 3, e.point.y + 3]];
        const features = this.map.queryRenderedFeatures(bbox, { layers: ['country-layer'] });

        for (const f of features) {
          console.log('clickedOn: ' + f.properties.NAME);
          if (!this.list.includes(f.properties.NAME)) {
            this.list.push(f.properties.NAME);
          }
        }
        this.map.setFilter('country-layer', this.list);
      });
    });
  }

  createNewPinpoint(map: any, lng: number, lat: number) {
    console.log("Create new marker on -> " + 'pinpoint' + lng + lat);
// tslint:disable-next-line: only-arrow-functions
    let randomIMG = '../../../../assets/';

    randomIMG += this.getRandomBoolean() ? 'blue-marker.png' : 'red-marker.png';

    map.loadImage(randomIMG, function(error, image) {
      if (error) { throw error; }
      map.addImage('pinpoint' + lng + lat, image);
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
          'icon-image': 'pinpoint' + lng + lat,
          'icon-size': 0.75,
        }
      });
    });
  }

  getRandomBoolean(): boolean {
    return Math.random() >= 0.5;
  }
}
