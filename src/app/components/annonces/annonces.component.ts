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
  pageSize = 6;
  currentPage = 1;


 sortField :string
  sortOrder : string;

  sortByDate: boolean = false;
  sortBySuperficie: boolean = false;
  desc: boolean = false; // define the 'desc' property
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
    this.sortField = '';
  this.sortOrder = 'asc';

    this.annonceService.getAnnonces().subscribe(
      (results: Annonce[]) => {
        console.log(results);
        this.response = results;
      }
    );
   
    
  }

  filterChange(appliedfilters: any) {
    this.annonceFilter.animeaux = appliedfilters?.appliedFilterValues.animeaux;
    this.annonceFilter.fumeurs = appliedfilters?.appliedFilterValues.fumeurs;
    this.annonceFilter.loyer = appliedfilters?.appliedFilterValues.loyer;
    this.annonceFilter.nbChambre = appliedfilters?.appliedFilterValues.nbChambre;
    this.annonceFilter.nbPersonne = appliedfilters?.appliedFilterValues.nbPersonne;
    this.annonceFilter.superficie = appliedfilters?.appliedFilterValues.superficie;
  
    // Make a copy of the original results array
    const originalResults = [...this.response];
  
    // Apply filters to the copied array
    if (typeof this.annonceFilter.animeaux !== "undefined") {
      this.response = originalResults.filter(item => item.animeaux == this.annonceFilter.animeaux);
    }
    if (typeof this.annonceFilter.fumeurs !== "undefined") {
      this.response = this.response.filter(item => item.fumeurs == this.annonceFilter.fumeurs);
    }
    if (this.annonceFilter.loyer) {
      this.response = this.response.filter(item => item.loyer == this.annonceFilter.loyer);
    }
    if (this.annonceFilter.nbChambre) {
      this.response = this.response.filter(item => item.nbChambre == this.annonceFilter.nbChambre);
    }
    if (this.annonceFilter.nbPersonne) {
      this.response = this.response.filter(item => item.nbPersonne == this.annonceFilter.nbPersonne);
    }
    if (this.annonceFilter.superficie) {
      this.response = this.response.filter(item => item.superficie == this.annonceFilter.superficie);
    }
  }
 
  
  dropdownOptions = [  { label: 'Date - Newest First', value: 'date_desc' },  { label: 'Date - Oldest First', value: 'date_asc' },  { label: 'Loyer - Low to High', value: 'loyer_asc' },  { label: 'Loyer - High to Low', value: 'loyer_desc' },  { label: 'Superfice - Small to Large', value: 'superfice_asc' },  { label: 'Superfice - Large to Small', value: 'superfice_desc' },  { label: 'NbChambre - Few to Many', value: 'nbChambre_asc' },  { label: 'NbChambre - Many to Few', value: 'nbChambre_desc' }];
  onSortOptionSelected(value: string) {
    switch (value) {
      case 'date_desc':
        this.sortField = 'date';
        this.sortOrder = 'desc';
        break;
      case 'date_asc':
        this.sortField = 'date';
        this.sortOrder = 'asc';
        break;
      case 'loyer_asc':
        this.sortField = 'loyer';
        this.sortOrder = 'asc';
        break;
      case 'loyer_desc':
        this.sortField = 'loyer';
        this.sortOrder = 'desc';
        break;
      case 'superfice_asc':
        this.sortField = 'superfice';
        this.sortOrder = 'asc';
        break;
      case 'superfice_desc':
        this.sortField = 'superfice';
        this.sortOrder = 'desc';
        break;
      case 'nbChambre_asc':
        this.sortField = 'nbChambre';
        this.sortOrder = 'asc';
        break;
      case 'nbChambre_desc':
        this.sortField = 'nbChambre';
        this.sortOrder = 'desc';
        break;
      default:
        this.sortField = '';
        this.sortOrder = '';
        break;
    }
  }
  
  calculatePagedItems(): Annonce[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.response.slice(startIndex, endIndex);
  }
  
  get pagedItems(): Annonce[] {
    return this.calculatePagedItems();

}
  

}


