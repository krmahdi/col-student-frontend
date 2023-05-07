import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  loggedinUser: string;
    constructor(private userService: AuthenticationService) { }

    ngOnInit() {
    }

    loggedin() {
   return this.userService.isLoggedIn();
       
    }

    onLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
      //  this.alertify.success('You are logged out !');
    }

}
