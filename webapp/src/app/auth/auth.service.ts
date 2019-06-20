import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserI } from '../jwt/user';
import { JwtResponseI } from '../jwt/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable()
export class AuthService {
  AUTH_SERVER = 'http://localhost:5000/api';
  authSubject = new BehaviorSubject(false);
  private token: string;
  constructor(private httpClient: HttpClient) { }

  login(user: UserI): Observable<JwtResponseI> {
    console.log(user);
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/login`, user).pipe(tap(
      (res: JwtResponseI) => {
        if (res) {
          console.log(res);
          this.saveToken(res.token, res.expiresIn);
        }

      }
    ));
  }
  logout(): void {
    this.token = '';
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('EXPIRES_IN');
  }

  private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem('ACCESS_TOKEN', token),
    localStorage.setItem('EXPIRES_IN', expiresIn);
    this.token = token;
  }
  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('ACCESS_TOKEN');
    }
    return this.token;
  }
  public isAuthenticated(): boolean {
    const token = localStorage. getItem('ACCESS_TOKEN');
    console.log(token);
    // Check whether the token is expired and return
    // true or false
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
