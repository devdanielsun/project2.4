import { MapService } from './../map.service';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { GeoJson, FeatureCollection } from '../map';


@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css']
})

export class MapBoxComponent implements OnInit {
  /// default settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/danielgeerts/cjx0c0f3x06yt1cs3yfskhjhv';

  private list: string[] = ['!in', 'NAME', 'Antarctica', 'Netherlands'];

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.initializeMap();
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
      zoom: 1,
      center: [0, 0]
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
        // set bbox as 5px reactangle area around clicked point
        const bbox = [[e.point.x - 5, e.point.y - 5], [e.point.x + 5, e.point.y + 5]];
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
}
