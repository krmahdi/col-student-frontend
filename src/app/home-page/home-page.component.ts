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
  isSignedin = false;

	signedinUser: string = '';

	ann: any[] = [];

	constructor(private route: ActivatedRoute, private router: Router, private authService: AuthenticationService, private annonce: AnnonceService) {}

	ngOnInit() {
		this.isSignedin = this.authService.isLoggedIn();
		this.signedinUser = this.authService.getSignedinUser();

		if(!this.authService.isLoggedIn()) {
			this.router.navigateByUrl('register');
		}

		if(this.isSignedin) {
			this.annonce.getAnnonce().subscribe((result: {}) => this.ann.push(result), () => console.log('/user - You are not authorize'));	}
	}

	doSignout() {
		this.authService.logout();
	}
}
