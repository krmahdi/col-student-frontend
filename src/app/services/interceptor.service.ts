import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
 import{AuthenticationService} from './authentication.service'
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
 
    constructor(private authService: AuthenticationService) { }
 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.isLoggedIn() && this.authService.getToken()) {
            const request = req.clone({
                headers: new HttpHeaders({
                    'Authorization': this.authService.getToken()
                })
            });
            return next.handle(request).pipe(
				catchError(err => {
					if(err instanceof HttpErrorResponse && err.status === 401) {
						this.authService.logout();
					}
					return throwError(err);
				})
			);
        }
       
		return next.handle(req);
    }

}