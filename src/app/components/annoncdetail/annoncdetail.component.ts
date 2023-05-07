import { Component, OnInit } from '@angular/core';
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
}
