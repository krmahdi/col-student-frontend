import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ActivatedRoute, Params } from '@angular/router';
import { Annonce } from 'src/app/interfaces/annonce.interface';
import { AnnonceService } from 'src/app/services/annonce.service';
import {
  faSmokingBan,
  faSmoking,
  faPaw,
  faBan,
} from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../services/authentication.service';

import { NgxStarRatingComponent } from 'ngx-star-rating/public-api';

@Component({
  selector: 'app-annoncdetail',
  templateUrl: './annoncdetail.component.html',
  styleUrls: ['./annoncdetail.component.css'],
})
export class AnnoncdetailComponent implements OnInit {

  map: L.Map;
  homeCoords = {
    lat: 36.8252687,
    lon: 10.3106223,
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

  response: Annonce;
  faSmokingBan = faSmokingBan;
  faSmoking = faSmoking;
  faPaw = faPaw;
  faBan = faBan;
  currentUser: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private annonceService: AnnonceService,
    private authenticationService: AuthenticationService

  ) {

    this.currentUser = this.authenticationService.getSignedinUser();
  }

  ngOnInit(): void {
    const mapContainer = L.DomUtil.get('map') || '';
    const mapOptions = this.options;
    this.map = L.map(mapContainer, mapOptions);

    // Do stuff with map
    this.initMarkers();
    // console.log({ response: this.response });
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      console.log(+params['get']('id')!);
      this.annonceService
        .getAnnonce(+params['get']('id')!)
        .subscribe((response: any) => {
          this.response = response;
          this.response.email = this.currentUser.email;
        });
    });
  }
  initMarkers() {
  this.popupText=`<div>${this.response.description}</div>`
 
        return L.marker([this.response.altitude, this.response.longitude], this.markerIcon)
          .addTo(this.map)
          .bindPopup(this.popupText);
      }
   
  }

