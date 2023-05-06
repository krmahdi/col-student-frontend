import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnnonceService } from 'src/app/services/annonce.service';
import { Annonce } from 'src/app/interfaces/annonce.interface';
import {AnnonceFilter} from 'src/app/interfaces/anoonceFilter.interface';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css']
})

export class AnnoncesComponent implements OnInit {
  response: Annonce[]=[]
  annonceFilter:AnnonceFilter={
    superficie: 0,
    loyer: 0,
    nbChambre: 0,
    nbPersonne: 0,
    animeaux: false,
    fumeurs: false,
  }
  filterList = {
    loyer : [100, 150, 200, 250,300,350,400,450,500,550,600],
    superficie: [40, 45, 50,55,60,65,70],
    nbChambre : [0,1, 2,3,4,],
    nbPersonne : [0,1, 2, 3, 4, 5, 6],
    animeaux : [true,false],
    fumeurs :  [true,false],

    //here you can add as many filters as you want.
    }; 
term:string
  constructor(private annonceService: AnnonceService) { }
  ngOnInit(): void {
    this.annonceService.getAnnonces().subscribe(
      (results: Annonce[]) => {
        console.log(results);
        this.response = results;
      }
    );
   
    
  }
  getAllAnnonce(){

    this.annonceService.getAnnonces().subscribe(
      (results: Annonce[]) => {
        console.log(results);
        this.response = results;
      }
    );
    return this.response;
  }
 

  filterChange(appliedfilters:any) {
 
     this.annonceFilter.animeaux=appliedfilters?.appliedFilterValues.animeaux;
     this.annonceFilter.fumeurs=appliedfilters?.appliedFilterValues.fumeurs;
     this.annonceFilter.loyer=appliedfilters?.appliedFilterValues.loyer;
     this.annonceFilter.nbChambre=appliedfilters?.appliedFilterValues.nbChambre;
     this.annonceFilter.nbPersonne=appliedfilters?.appliedFilterValues.nbPersonne;
     this.annonceFilter.superficie=appliedfilters?.appliedFilterValues.superficie;
  //console.log(animeaux,fumeurs,loyer,nbChambre,nbPersonne,superficie)
 if(typeof(this.annonceFilter.animeaux)!==undefined){
  this.annonceService.getAnnonces().subscribe(
    (results: Annonce[]) => {
           this.response = results;
           this.response=this.response.filter(item=>item.animeaux==this.annonceFilter.animeaux);
            
    }
  ); }
 if(typeof(this.annonceFilter.fumeurs)!==undefined){
  this.response=this.response.filter(item=>item.fumeurs==this.annonceFilter.fumeurs);
 }
 if(this.annonceFilter.loyer){
  this.response=this.response.filter(item=>item.loyer==this.annonceFilter.loyer);
 }
 if(this.annonceFilter.nbChambre){
  this.response=this.response.filter(item=>item.nbChambre==this.annonceFilter.nbChambre);
 }
 if(this.annonceFilter.nbPersonne){
  this.response=this.response.filter(item=>item.nbPersonne==this.annonceFilter.nbPersonne);
 }
 if(this.annonceFilter.superficie){
  this.response=this.response.filter(item=>item.superficie==this.annonceFilter.superficie);
 }
  
}
  
}
  



