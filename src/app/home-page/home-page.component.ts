import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import{AuthenticationService} from '../services/authentication.service'
import { AnnonceService } from '../services/annonce.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {


	constructor(private route: ActivatedRoute, private router: Router, private authService: AuthenticationService, private annonce: AnnonceService) {}

	ngOnInit() {
	

	}
	
}
