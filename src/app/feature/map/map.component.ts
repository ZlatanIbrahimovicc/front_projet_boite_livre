import { Component, OnInit } from '@angular/core';
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  providers: [
    LeafletModule
  ],
  templateUrl: './map.component.html',
  imports: [
    LeafletModule
  ],
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  mapLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  map: Leaflet.Map|null = null;
  maxZoom: number = 22;
  minZoom: number = 6;

  constructor() { }

  ngOnInit(): void {
    this.initializeOSM();
  }

  initializeOSM(){
    if (!this.map) {
      this.map = Leaflet.map('map', {
        center: [21.1458, 79.0882],
        zoom: 3,
        zoomControl: false,
        attributionControl: false,
      });
      const tiles = Leaflet.tileLayer(this.mapLayerUrl, {
        maxZoom: this.maxZoom,
        minZoom: this.minZoom
      });

      tiles.addTo(this.map);
    }
  }
}
