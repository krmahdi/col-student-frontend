import { Injectable, Query } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ecole } from '../interfaces/ecole.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'http://localhost:8080/api/auth'; // your API URL

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
    console.log(email, password)
    return this.http.post<any>(`${this.apiUrl}/authenticate`, { email: email, password: password })
      .pipe(
        map(response => {
          // login successful if there's a jwt token in the response
          const token = response.token;
          if (token) {
            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify({  token: token }));
            return true;
          } else {
            return false;
          }
        })
      );
  }
getEcole(name:string ):Observable<any>{
return this.http.get<any>(`${this.apiUrl}/ecoles/name?q=${name}`)
}
getAllEcole():Observable<Ecole[]>{
  return this.http.get<any>(`${this.apiUrl}/ecoles`)
}
  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  register(register:any): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/register`, register)
      
  }
  
  isLoggedIn(): boolean {
    // check if user is logged in based on whether the currentUser object exists in local storage
    return !!localStorage.getItem('currentUser');
  }

  getToken(): string  {
    // return jwt token from local storage
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = currentUserString ? JSON.parse(currentUserString) : null;
    
    return currentUser?.token || null;
}

getSignedinUser() {
  return sessionStorage.getItem('user') as string;
}

}
