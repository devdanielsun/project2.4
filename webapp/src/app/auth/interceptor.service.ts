import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';


import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Router } from '@angular/router';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(public auth: AuthService, private router: Router) {
    console.log('doeei');
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(this.auth.getToken());

    if (this.auth.getToken()) {
      const temp = request.clone({
        setHeaders: {
          'Access-Control-Allow-Headers': '*',
          Authorization: `Bearer ${this.auth.getToken()}`
        }
      });
      return next.handle(temp).pipe(catchError(error => {
      // intercept the respons error and displace it to the console
      console.log(error);
      // return the error to the method that called it
      return throwError(error);
    }));
    } else {
      return next.handle(request);
    }
  }
}
