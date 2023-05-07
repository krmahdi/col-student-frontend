import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Register } from '../interfaces/register.interface';
import {Ecole} from '../interfaces/ecole.interface'
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  registerForm: FormGroup;
  selectedEcole: Ecole;
  response: Ecole[]=[]
  term:string='';
  username: string;
  password: string;
  errorMessage: string;
  userRegistered: Register = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    id: 0,
    numTel: '',
  };
  token: string;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: Router
  ) {
    this.RegisterForm();
  }
  ngOnInit() {
    this.authenticationService.getAllEcole().subscribe((ecole:Ecole[])=>{ console.log(ecole);this.response=ecole;
        
    });
  }

  login() {
    //const authenticationRequest = { username: this.username, password: this.password };
    this.authenticationService.login(this.username, this.password).subscribe(
      (authenticationResponse) => {
        console.log(authenticationResponse);
        this.route.navigate(['/create']);
        sessionStorage.setItem('user', this.username);
        sessionStorage.setItem('token', 'HTTP_TOKEN ' + this.token);
        return;
      },
     
     /* (error) => {
        this.errorMessage = 'Invalid credentials';
      }*/
    );
   
  }
  register() {
    const selectedEcole = this.response.find(ecole => ecole.nomEcole === this.registerForm.value.nomEcole);
    const idEcole = selectedEcole ? selectedEcole.idEcole : null;
    console.log('Selected Ecole ID:', idEcole);
    this.userRegistered.firstname = this.registerForm.value.firstname;
    this.userRegistered.lastname = this.registerForm.value.lastname;
    this.userRegistered.email = this.registerForm.value.email;
    this.userRegistered.password = this.registerForm.value.password;
   this.userRegistered.numTel=this.registerForm.value.numTel;
if(idEcole){
  this.userRegistered.id=idEcole;

}   this.authenticationService.register(this.userRegistered).subscribe(
     
      () => {
        console.log('Registration successful');
        // Redirect to login page or display success message
        // this.route.navigate(['/annonces']);
      },
      /*(error) => {
        this.errorMessage = error.error.message;
      }*/
    );
  }
  RegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      numTel: ['', Validators.required],
     nomEcole: ['',Validators.required],
    });
  }
  submit(ecole: Ecole) {
    // Send the selected university to the server
  }
  
}
