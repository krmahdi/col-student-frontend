import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnnonceService } from '../services/annonce.service';
import { Annonce } from 'src/app/interfaces/annonce.interface';

@Component({
  selector: 'app-create-annonce',
  templateUrl: './create-annonce.component.html',
  styleUrls: ['./create-annonce.component.css']
})
export class CreateAnnonceComponent  {
  advertisementForm: FormGroup;
  request: Annonce[];
  constructor(private formBuilder: FormBuilder,private annonceService: AnnonceService) { }

  ngOnInit() {
    this.advertisementForm = this.formBuilder.group({
      location: ['', Validators.required],
      description: ['', Validators.required],
      superficie: ['', Validators.required],
      loyer: ['', Validators.required],
      nbChambre: [''],
      animaux: [''],
      fumeurs: [''],
      adresse: [''],
      caution: ['']
    });
  }

  
  onSubmit() {
    this.annonceService.createAnnonce(this.request).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }
}
