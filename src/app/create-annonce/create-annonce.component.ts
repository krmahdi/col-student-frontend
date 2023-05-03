import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnnonceService } from '../services/annonce.service';
import { Annonce } from 'src/app/interfaces/annonce.interface';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-create-annonce',
  templateUrl: './create-annonce.component.html',
  styleUrls: ['./create-annonce.component.css'],
})
export class CreateAnnonceComponent {
  latitude: number;
  longitude: number;

  annonceForm: FormGroup;
  request: Annonce[];
  annonce: Annonce = {
    idAnnonce: 0,
    description: '',
    superficie: 0,
    loyer: 0,
    nbChambre: 0,
    nbPersonne: 0,
    animeaux: false,
    fumeurs: false,
    adresse: '',
    caution: 0,
    longitude: 0,
    altitude: 0,
    user: this.authenticationService.getSignedinUser(),
    evaluations: null,
    photos: null,
    signalements: null,
    supprimee: false,
  };
  currentUser: any;
  constructor(
    private formBuilder: FormBuilder,
    private annonceService: AnnonceService,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.getSignedinUser();
    console.log(this.currentUser);
    console.log(this.authenticationService.isLoggedIn());
    console.log(this.authenticationService.getToken());

    this.createForm();
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      console.log(`Latitude: ${this.latitude}, Longitude: ${this.longitude}`);
    });
  }

  createForm() {

    this.annonceForm = this.formBuilder.group({
      description: ['', Validators.required],
      superficie: ['', Validators.required],
      loyer: ['', Validators.required],
      nbChambre: ['', Validators.required],
      nbPersonne: ['', Validators.required],
      animeaux: [''],
      fumeurs: [''],
      adresse: ['', Validators.required],
      caution: [''],
      longitude: [this.longitude],
      altitude: [this.latitude],
      user: this.currentUser.id,
    });
  }

  onSubmit() {
    console.log({this: this.createForm})
    // Update the longitude and latitude properties of the annonce object
    this.annonce.longitude = this.longitude;
    this.annonce.altitude = this.latitude;
    console.log({ annonceForm: this.annonceForm.value });

    // Set the user property of the annonce object to the current user's email
    this.annonce.user = this.currentUser.email;
    // Set the values of the form controls on the annonce object
    this.annonce.description = this.annonceForm.value.description;
    this.annonce.superficie = this.annonceForm.value.superficie;
    this.annonce.loyer = this.annonceForm.value.loyer;
    this.annonce.nbChambre = this.annonceForm.value.nbChambre;
    this.annonce.nbPersonne = this.annonceForm.value.nbPersonne;
    this.annonce.animeaux = this.annonceForm.value.animeaux;
    this.annonce.fumeurs = this.annonceForm.value.fumeurs;
    this.annonce.adresse = this.annonceForm.value.adresse;
    this.annonce.caution = this.annonceForm.value.caution;

    this.annonceService.createAnnonce(this.annonce).subscribe(() => {
      console.log('success');
    });
  }

  isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }
}
