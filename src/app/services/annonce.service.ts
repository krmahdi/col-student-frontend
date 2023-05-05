import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Annonce } from '../interfaces/annonce.interface';
import { AuthenticationService } from './authentication.service';
import { AnnonceFilter } from '../interfaces/anoonceFilter.interface';

@Injectable({providedIn: 'root'})
export class AnnonceService {
  private  apiUrl : String = 'http://localhost:8080/api/auth/v1/annonce';

  constructor(private http: HttpClient,private authService:AuthenticationService) { 
  }
  
     token = this.authService.getToken();
   
   
  getAnnonces(): Observable <Annonce[]> {
    return this.http.get<any>(`${this.apiUrl}`)
  }
  getAnnonce(uuid: number = 1 ): Observable <Annonce> {
    return this.http.get<any>(`${this.apiUrl}/${uuid}`)
  }
  createAnnonce(annonce: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, annonce, { headers: new HttpHeaders().set( 'Authorization', `Bearer ${this.token}`) });
  }

  search(query: string): Observable<Annonce[]> {
    const url = `${this.apiUrl}/search?q=${query}`;
    return this.http.get<Annonce[]>(url);
  }

  filter(annonce: AnnonceFilter): Observable<Annonce[]> {
    const url = `${this.apiUrl}/filter`;
    return this.http.get<Annonce[]>(url, { responseType: 'json' });
  }
}
/*
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Response } from '../interface/response.interface';
import { User } from '../interface/user.interface';



  private processResponse(response: Response): Response {
    return {
      info: { ...response.info },
      results: response.results.map((user: any) => (<User>{
        uuid: user.login.uuid,
        firstName: user.name.first,
        lastName: user.name.last,
        email: user.email,
        username: user.login.username,
        gender: user.gender,
        address: `${user.location.street.number} ${user.location.street.name} ${user.location.city}, ${user.location.country}`,
        dateOfBirth: user.dob.date,
        phone: user.phone,
        imageUrl: user.picture.medium,
        coordinate: { latitude: +user.location.coordinates.latitude, longitude: +user.location.coordinates.longitude }
      }))
    };
  }
}
 */