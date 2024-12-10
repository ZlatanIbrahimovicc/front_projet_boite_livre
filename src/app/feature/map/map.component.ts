import {AfterViewInit, Component} from '@angular/core';
import {BoxService} from "../../shared/services/box.service";
import * as L from 'leaflet';
import {Box} from "../../shared/models/box";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})export class MapComponent implements AfterViewInit {
  private map: L.Map | L.LayerGroup<any> | undefined;

  private initMap(boxes: Box[]): void {
    this.map = L.map('map', {
      center: [ 47.383333, 0.683333 ],
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });


    var myIconClass = L.Icon.extend({
      options: {
        iconSize:     [38, 45],
        iconAnchor:   [22, 94],
        popupAnchor:  [-3, -76]
      }
    });

    var icon = new myIconClass();
    icon.options.iconUrl = './assets/frogPing.png';


    const listBox: Box[] = boxes;

    listBox.forEach(box => {
      if (this.map) {
      L.marker([parseFloat(box.point_geo.split(',')[0]), parseFloat(box.point_geo.split(',')[1])], {icon: icon})
        .bindPopup(`Nom: ${box.nom}<br>Quantité : ${box.quantite}<br>Description: ${box.description}`)
        .addTo(this.map);
      }
    });




    tiles.addTo(this.map);
  }

  constructor(private boxService: BoxService) { }

  ngAfterViewInit(): void {
    this.boxService.getAll().subscribe((data: Box[]) => {
      this.initMap(data);
    });
  }
}
