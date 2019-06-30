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
  BackendCasper = '145.37.156.115:8080';
  AUTH_SERVER = 'http://csprl.nl:8088'; // http://localhost:5000/api';
  //'http:csprl.nl:8088';
  BACKEND_SERVER = '145.37.156.225:8080';
  authSubject = new BehaviorSubject(false);
  private token: string;
  private loggedIn = false;
  private loggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {
    this.isAuthenticated();
  }

  get isLoggedIn() {
    return this.loggedIn$.asObservable();
  }

  login(user: UserI): Observable<JwtResponseI> {
    console.log(JSON.stringify(user));
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/login`, JSON.stringify(user)).pipe(tap(
      (res: JwtResponseI) => {
        if (res) {
          console.log(res);
          this.saveToken(res.newToken, res.userId);
          this.loggedIn$.next(true);
        }
      },
      (err) => {
        console.log(err);
      }
    ));
  }
  logout(): void {
    this.token = '';  
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('ID');
    localStorage.clear();
    this.loggedIn$.next(false);
  }

  register(regUser: RegUserI): Observable<JwtResponseI> {
    console.log(JSON.stringify(regUser));
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/registration`, JSON.stringify(regUser)).pipe(tap(
      (res: JwtResponseI) => {
        if (res) {
          console.log(res);
          this.saveToken(res.newToken, res.userId);
          this.loggedIn$.next(true);
        }
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  private saveToken(token: string, id: number): void {
    localStorage.setItem('ACCESS_TOKEN', token),
    localStorage.setItem('ID', id.toString());
    this.token = token;
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
  public getIsLoggedIn() {
    return this.loggedIn;
  }


  public isAuthenticated(): boolean {
    const token = localStorage.getItem('ACCESS_TOKEN');
    // Check whether the token is expired and return
    // true or false
    if (token && token != null) {
      if (this.isExpired(token)) {
        this.loggedIn$.next(false);
        this.logout();
        return false;
      }
      this.loggedIn$.next(true);
      return true;
    } else {
      this.loggedIn$.next(false);
      this.logout();
      return false;
    }
  }
}
