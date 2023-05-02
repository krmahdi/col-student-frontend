import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  register(firstname: string,lastname:string, password: string, email: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/register`, { firstname: firstname,lastname:lastname, email: email, password: password })
      .pipe(
        map(response => {
          // registration successful if there's a jwt token in the response
          const token = response.token;
          if (token) {
            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify({ email: email, token: token }));
            return true;
          } else {
            return false;
          }
        })
      );
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
