import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import{AuthenticationService} from '../services/authentication.service'
import { AnnonceService } from '../services/annonce.service';
import { Annonce } from '../interfaces/annonce.interface';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
response:Annonce[]
term:string
	constructor(private route: ActivatedRoute, private router: Router, private authService: AuthenticationService, private annonce: AnnonceService) {}

	ngOnInit() {
    this.annonce.getAnnonces().subscribe(
      (results: Annonce[]) => {
        console.log(results);
        this.response = results.slice(0,6);
      }
    );

	}
 
  
}
