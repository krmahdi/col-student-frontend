import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { AnnonceService } from '../services/annonce.service';
import { Annonce } from '../interfaces/annonce.interface';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css']
})
export class MapComponentComponent implements OnInit, AfterViewInit {
 private map: L.Map;
 query: string = '';
   filterForm:any={}
  homeCoords = {
    lat: 33.8439408,
    lon: 9.400138
  };
  
  annonces: Annonce[] = [];
    popupText = 'Some popup text';

  markerIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl:
        'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
      shadowUrl:
        'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png'
    })
  };

  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 100,
        attribution: ''
      })
    ],
    zoom: 5,
    center: L.latLng(this.homeCoords.lat, this.homeCoords.lon)
  };

  constructor(private annonceService: AnnonceService,private http:HttpClient) {}

  ngOnInit() {
    this.getAnnonces();
   

  }

  
  

  ngAfterViewInit() {
    const map = L.map('map', this.options);
    this.map = map;
    L.control.scale().addTo(this.map);
    
    // Move the initMarkers() function call inside the callback function
    this.map.on('load', () => {
      this.initMarkers();
    });
  }
  
  getAnnonces() {
    this.annonceService.getAnnonces().subscribe((data) => {
      this.annonces = data;
    });
  }

  initMarkers() {
    this.annonces.map((annonce) => {
      const popupInfo = `<b style="color: red; background-color: white">${annonce.loyer}</b>`;
      return L.marker([annonce.altitude, annonce.longitude], this.markerIcon)
        .addTo(this.map)
        .bindPopup(popupInfo);
    });
  }
  searchQuery: string = '';

  search() {
    // do something with the search query
    const city = this.searchQuery;
    console.log('searching for', city);
    const url = `https://nominatim.openstreetmap.org/search?q=${city}&format=json`;
    this.http.get(url).subscribe((data: any) => {
      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        console.log(`Latitude: ${lat}, Longitude: ${lon}`);
        // You can use these latitude and longitude values to display the city on the map
        const zoomLevel = 10; // adjust zoom level to your liking
        this.map.setView([lat, lon], zoomLevel);
      } else {
        console.log('City not found');
      }
    });
  }
  
  
}
