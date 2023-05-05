
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { AnnonceService } from '../services/annonce.service';
import { Annonce } from '../interfaces/annonce.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import{AnnonceFilter} from '../interfaces/anoonceFilter.interface'
@Component({
  selector: 'app-root',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css'],
})
export class MapComponentComponent implements OnInit {
  map: L.Map;

  homeCoords = {
    lat: 36.8252687,
    lon: 10.3106223,
  };
  annonces: Annonce[] = [];

  popupText = 'Some popup text';

  markerIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
      shadowUrl:
        'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',
    }),
  };

  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '',
      }),
    ],
    zoom: 10,
    center: L.latLng(this.homeCoords.lat, this.homeCoords.lon),
  };
  constructor(
    private annonceService: AnnonceService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const mapContainer = L.DomUtil.get('map') || '';
    const mapOptions = this.options;
    this.map = L.map(mapContainer, mapOptions);

    // Do stuff with map
    this.initMarkers();
  }

  initMarkers() {
    this.annonceService.getAnnonces().subscribe((data) => {
      data.map((annonce) => {
        const popupInfo = `<b style="color: red; background-color: white">${annonce.description}</b>`;
        return L.marker([annonce.altitude, annonce.longitude], this.markerIcon)
          .addTo(this.map)
          .bindPopup(popupInfo);
      });
    });

  
  }
  filter: AnnonceFilter = {
    superficie: 1000,
    loyer: 1000,
    nbChambre: 1000,
    nbPersonne: 1000,
    animeaux: false,
    fumeurs: false
  };
  filterAnnonces() {
    this.annonceService.filter(this.filter)
      .subscribe(annonces => {this.annonces = annonces;console.log(this.annonces)
      });
  }
  
}
