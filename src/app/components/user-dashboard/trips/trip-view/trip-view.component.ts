import { Component, Input, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/Itenaries';

import * as L from 'leaflet';
@Component({
  selector: 'app-trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.scss'],
})
export class TripViewComponent implements OnInit {
  @Input() trip!: Trip;
  theMap!: L.Map;
  currentZoom = 2;

  ngOnInit(): void {
    this.theMap = L.map('map').setView(
      [this.trip.tripLocation?.lat || 23, this.trip.tripLocation?.lon || 23],
      this.currentZoom
    );

    let mapLayer = L.tileLayer(
      'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
      {
        maxZoom: 20,
        attribution:
          '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      }
    ).addTo(this.theMap);
  }

  getTime(time: string) {
    return time.substring(0, 5);
  }

  zoomInToLocation() {
    //zoom in zoom out type thing
    if (this.currentZoom > 2) {
      this.currentZoom = 2;
    } else {
      this.currentZoom = 8;
    }
    this.theMap.flyTo(
      [this.trip.tripLocation?.lat || 23, this.trip.tripLocation?.lon || 23],
      this.currentZoom
    );
  }
}
