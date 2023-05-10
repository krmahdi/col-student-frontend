import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { AnnonceService } from '../services/annonce.service';
import { Annonce } from '../interfaces/annonce.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnnonceFilter } from '../interfaces/anoonceFilter.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css'],
})
export class MapComponentComponent implements OnInit {
  myForm: FormGroup;

  map: L.Map;
  homeCoords = {
    lat: 36.8252687,
    lon: 10.3106223,
  };
  annonces: Annonce[] = [];
  annonceFilter: AnnonceFilter = {
    superficie: 0,
    loyer: 0,
    nbChambre: 0,
    nbPersonne: 0,
    animeaux: false,
    fumeurs: false,
  };
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
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      ecoleInput: [''],
    });
    const mapContainer = L.DomUtil.get('map') || '';
    const mapOptions = this.options;
    this.map = L.map(mapContainer, mapOptions);

    // Do stuff with map
    this.initMarkers();
  }

  initMarkers() {
    this.annonceService.getAnnonces().subscribe((data) => {
      data.map((annonce) => {
        const popupInfo = `<div role="button"
        onclick="window.location.href='http://localhost:4200/annonce/${annonce.idAnnonce}'"
         class="container text-center">
        <div class="row ">
        <div class="col-md-12 mb-2">
        <div class=" rounded-2 my-4 w-auto">        
         <img class="rounded-1" src=${annonce.photos[0]?.pathPhoto} height="250" width="250" >
        </div>

            <div class="fw-bold">superficie : ${annonce.superficie} m²</div>
             <div class="fw-bold">loyer : ${annonce.loyer} TND</div>
              <div class="fw-bold">adresse : ${annonce.adresse}</div>
        </div>
        </div>
        </div>
        `;

        return L.marker([annonce.altitude, annonce.longitude], this.markerIcon)
          .addTo(this.map)
          .bindPopup(popupInfo);
      });
    });
  }
  onSubmit() {
    const ecoleName = this.myForm.get('ecoleInput')?.value;
    console.log(ecoleName);
    this.annonces = this.annonces.filter(function (annonce) {
      return annonce.user.ecole.nomEcole === ecoleName;
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
