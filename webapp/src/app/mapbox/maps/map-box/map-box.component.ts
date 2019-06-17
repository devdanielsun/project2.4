import { MapService } from './../map.service';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { GeoJson, FeatureCollection } from '../map';


@Component({
  selector: 'map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css']
})
export class MapBoxComponent implements OnInit{

  /// default settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/danielgeerts/cjx0c0f3x06yt1cs3yfskhjhv';
  lng = 2.317600;
  lat = 48.866500;
  message = 'Dit is europa!';

  // data
  source: any;
  markers: any;

  constructor(private mapService: MapService) {

  }

  ngOnInit() {
    this.markers = new Array();
    //this.markers.push(new GeoJson(37.75, -122.41));
    //this.markers = this.mapService.getMarkers()
    this.initializeMap();
  }

  private initializeMap() {
    /// locate the user
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat]
        });
      });
    }

    this.buildMap();

  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 1,
      center: [this.lng, this.lat]
    });


    /// Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());


    //// Add Marker on Click
    this.map.on('click', (event) => {
      const coordinates = [event.lngLat.lng, event.lngLat.lat]
      const newMarker   = new GeoJson(coordinates, { message: this.message });
      console.log(coordinates);
    });

    this.map.on('load', (event) => {
      this.map.addSource('everycountry', {
        'type': 'vector',
        'url': 'mapbox://danielgeerts.0e8dwloy',
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
        filter: this.mapService.getVisitedCountries(),
      }, 'holiday_overlay');

      /*this.map.addLayer({
        "id": "countries-highlighted",
        "type": "fill",
        "source": "everycountry",
        "source-layer": "ne_10m_admin_0_countries-8bj9st",
        "paint": {
          "fill-outline-color": "rgba(0,0,0,0)",
          "fill-color": "rgba(255,255,255,0.25)",
          "fill-opacity": 1
        },
      }, 'holiday_overlay');*/

      let list = ['!in', 'NAME', 'Antarctica', 'Netherlands'];


      this.map.on('click', (e: any) => {
        // set bbox as 5px reactangle area around clicked point
        const bbox = [[e.point.x - 5, e.point.y - 5], [e.point.x + 5, e.point.y + 5]];
        const features = this.map.queryRenderedFeatures(bbox, { layers: ['country-layer'] });

        let f;
        for (f of features) {
          console.log('clickedOn: ' + f.properties.NAME);
          this.addCountry(list, f.properties.NAME);
        }

        this.map.setFilter('country-layer', list);
      });
    });
  }

  addCountry(arr: string[], data: string): void {
    if (arr && data) {
      arr.push(data);
    }
  }
}
