import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import {Jwt} from 'jsonwebtoken';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

export class RegisterPageComponent {

  username: string;
  password: string;
  errorMessage: string;
  firstname:string;
  lastname:string;
  email:string;
token:string;
  constructor(private authenticationService: AuthenticationService,private route: Router) { }
  ngOnInit() {
   
  }
  
  login() {
    //const authenticationRequest = { username: this.username, password: this.password };
    this.authenticationService.login(this.username,this.password)
      .subscribe((authenticationResponse) => {
        console.log(authenticationResponse);
        this.route.navigate(['/acceuil']);
        sessionStorage.setItem('user', this.username);
        sessionStorage.setItem('token', 'HTTP_TOKEN ' + this.token);
        return

      },(error) => {
        this.errorMessage = 'Invalid credentials';
      })
  }
  register(){
    this.authenticationService.register(this.firstname,this.lastname,this.password,this.email)
     .subscribe(
      () => {
        console.log('Registration successful');
        // Redirect to login page or display success message
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    );
  }


}
