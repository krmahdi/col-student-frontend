import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import {Jwt} from 'jsonwebtoken';
import { Register } from '../interfaces/register.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

export class RegisterPageComponent {
  registerForm: FormGroup;
registerUser:Register={
  firstname:'',
  lastname:'',
  email:'',
  password:'',
 numTel:''
};
  username: string;
  password: string;
  errorMessage: string;
token:string;
  constructor(private authenticationService: AuthenticationService,private route: Router,    private formBuilder: FormBuilder    ) {
    this.createForm()
   }
  ngOnInit() {
   
  }
  
  login() {
    //const authenticationRequest = { username: this.username, password: this.password };
    this.authenticationService.login(this.username,this.password)
      .subscribe((authenticationResponse) => {
        console.log(authenticationResponse);
        this.route.navigate(['/create']);
        sessionStorage.setItem('user', this.username);
        sessionStorage.setItem('token', 'HTTP_TOKEN ' + this.token);
        return

      },(error) => {
        this.errorMessage = 'Invalid credentials';
      })
  }
  register(){
    this.registerUser.firstname = this.registerForm.value.firstname;
    this.registerUser.lastname = this.registerForm.value.lastname;
    this.registerUser.numTel = this.registerForm.value.numTel;
    this.registerUser.email = this.registerForm.value.email;
    this.registerUser.password = this.registerForm.value.password;
   
    this.authenticationService.register(this.registerUser)
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
  createForm() {

    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      numTel: ['', Validators.required]


});
}



}