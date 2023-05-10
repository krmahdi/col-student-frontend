import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AnnonceService } from '../services/annonce.service';
import { Annonce } from '../interfaces/annonce.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  response: Annonce[] = [];
  term: string;
  latitude: number;
  longitude: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private annonceService: AnnonceService
  ) {}

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(position);
        this.loadAnnonces();
      }, (error) => {
        console.error(error);
        this.loadAnnonces();
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
      this.loadAnnonces();
    }
  }

  loadAnnonces() {
    this.annonceService.getAnnonces().subscribe((results: Annonce[]) => {
      console.log(results);
      this.response = results.filter((annonce: Annonce) => {
        const distance = this.getDistanceFromLatLonInKm(
          this.latitude,
          this.longitude,
          annonce.altitude,
          annonce.longitude
        );
        console.log(distance);
        return distance <= 149; // Only show annonces within 10km of the user's location
      }).slice(0, 6);
      ;
    });
  }

  // Helper function to calculate the distance between two sets of latitude/longitude coordinates
   getDistanceFromLatLonInKm( lat1:number, lon1:number,  lat2:number,  lon2:number) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
   deg2rad(deg:number) {
    return deg * (Math.PI/180)
  }
}
