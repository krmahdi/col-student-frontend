import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent {

  username: string;
  password: string;

  constructor(private authenticationService: AuthenticationService,private router: Router) { }

  login() {
    //const authenticationRequest = { username: this.username, password: this.password };
    this.authenticationService.login(this.username,this.password)
      .subscribe((authenticationResponse) => {
        console.log(authenticationResponse);
      });
  }
  goToRegister() {
    this.router.navigate(['/register']).then(
      () => {
        console.log('Navigation succeeded');
      },
      (error) => {
        console.log('Navigation failed:', error);
      }
    );
  }
  
  
}
