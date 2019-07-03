import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';


import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Router } from '@angular/router';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(public auth: AuthService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.auth.getToken()) {
      const temp = request.clone({
        setHeaders: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Content-Type': 'application/json',
          'token': this.auth.getToken(),
        }
      });
      return next.handle(temp).pipe(catchError(error => {
        // intercept the respons error and displace it to the console
        console.log(error);
        // return the error to the method that called it
        return throwError(error);
      }));
    } else {
      const temp = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
      return next.handle(temp).pipe(catchError(error => {
        // intercept the respons error and displace it to the console
        console.log(error);
        // return the error to the method that called it
        return throwError(error);
      }));
    }
  }
}
