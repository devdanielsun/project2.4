import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegUserI } from '../jwt/reg-user';
import { UserI } from '../jwt/user';
import { JwtResponseI } from '../jwt/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class AuthService {
  AUTH_SERVER = 'http://localhost:5000/api';
  BACKEND_SERVER = '145.37.156.225:8080';
  authSubject = new BehaviorSubject(false);
  private token: string;
  private loggedIn = false;
  private loggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { }

  get isLoggedIn() {
    return this.loggedIn$.asObservable();
  }

  login(user: UserI): Observable<JwtResponseI> {
    console.log(user);
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/login`, user).pipe(tap(
      (res: JwtResponseI) => {
        if (res) {
          console.log(res);
          this.saveToken(res.token, res.expiresIn);
          this.loggedIn$.next(true);
        }
      }
    ));
  }
  logout(): void {
    this.token = '';
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('EXPIRES_IN');
    this.loggedIn$.next(false);
  }

  register(regUser: RegUserI): Observable<JwtResponseI> {
    console.log(regUser);
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/register`, regUser).pipe(tap(
      (res: JwtResponseI) => {
        if (res) {
          console.log(res);
          this.saveToken(res.token, res.expiresIn);
          this.loggedIn$.next(true);
        }
      }
    ));
}

  private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem('ACCESS_TOKEN', token),
    localStorage.setItem('EXPIRES_IN', expiresIn);
  }
  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('ACCESS_TOKEN');
    }
    return this.token;
  }

  public isExpired(token) {
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(token);
    if (decoded.exp === undefined) {
      return true;
    }
    const datum = new Date(0);
    datum.setUTCSeconds(decoded.exp);
    return !(datum.valueOf() > new Date().valueOf());
  }
  public getIsLoggedIn(){
    return this.loggedIn;
  }


  public isAuthenticated(): boolean {
    const token = localStorage.getItem('ACCESS_TOKEN');
    // Check whether the token is expired and return
    // true or false
    if (token) {
      if (this.isExpired(token)) {
        this.logout();
        this.loggedIn$.next(false);
        return false;
      }
      this.loggedIn$.next(true);
      return true;
    } else {
      this.loggedIn$.next(false);
      return false;
    }
  }
}
