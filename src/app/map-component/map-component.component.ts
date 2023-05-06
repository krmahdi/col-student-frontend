
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { AnnonceService } from '../services/annonce.service';
import { Annonce } from '../interfaces/annonce.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import{AnnonceFilter} from '../interfaces/anoonceFilter.interface'
import { FormGroup ,FormBuilder,Validators} from '@angular/forms';

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
  annonceFilter:AnnonceFilter={
    superficie: 0,
    loyer: 0,
    nbChambre: 0,
    nbPersonne: 0,
    animeaux: false,
    fumeurs: false,
  }
  popupText = 'Some popup text';
  filterList = {
    loyer : [100, 150, 200, 250,300,350,400,450,500,550,600],
    superficie: [40, 45, 50,55,60,65,70],
    nbChambre : [0,1, 2,3,4,],
    nbPersonne : [0,1, 2, 3, 4, 5, 6],
    animeaux : [true,false],
    fumeurs :  [true,false],

    //here you can add as many filters as you want.
    };  
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
    private http: HttpClient,  private formBuilder: FormBuilder,
  ) {
 
  }

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
 

 /* createForm() {

    this.filterForm = this.formBuilder.group({
     // description: ['', Validators.required],
      superficie: ['', Validators.required],
      loyer: ['', Validators.required],
      nbChambre: ['', Validators.required],
      nbPersonne: ['', Validators.required],
      animeaux: [false],
      fumeurs: [false],
     /* adresse: ['', Validators.required],
      caution: [''],
      longitude: [this.longitude],
      altitude: [this.latitude],
      user: this.currentUser.id,
    });
  }
  filter: AnnonceFilter = {
    superficie: 0,
    loyer: 0,
    nbChambre: 0,
    nbPersonne: 0,
    animeaux: false,
    fumeurs: false
  };
  filterAnnonces() {
    this.filter.superficie = this.filterForm.value.superficie;
    this.filter.loyer = this.filterForm.value.loyer;
    this.filter.nbChambre = this.filterForm.value.nbChambre;
    this.filter.nbPersonne = this.filterForm.value.nbPersonne;
    this.filter.animeaux = this.filterForm.value.animeaux;
    this.filter.fumeurs = this.filterForm.value.fumeurs;

    this.annonceService.filter(this.filter)
      .subscribe(annonces => {this.annonces = annonces;console.log(this.annonces)
      });
  }
  */
}
