import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnnonceService } from 'src/app/services/annonce.service';
import { Annonce } from 'src/app/interfaces/annonce.interface';


@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css']
})

export class AnnoncesComponent implements OnInit {
  response: Annonce[];
  

  constructor(private annonceService: AnnonceService) { }
  ngOnInit(): void {
    this.annonceService.getAnnonces().subscribe(
      (results: Annonce[]) => {
        console.log(results);
        this.response = results;
      }
    );
   
    
  }

  
}
  



