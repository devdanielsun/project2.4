import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProfileI } from './profile';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  getFriends(): Observable<any> {
    const myID = localStorage.getItem('ID');
    const myTOKEN: any = localStorage.getItem('ACCESS_TOKEN');

    return this.httpClient.get<any>(`http://145.37.156.115:8080/user/${myID}`, myTOKEN);
  }

  getFriend(id: number | string) {
    return this.getFriends().pipe(
      // (+) before `id` turns the string into a number
      map((profiles: ProfileI[]) => profiles.find(user => user.userId === +id))
    );
  }

  getSecret(): Observable<any> {
    return this.httpClient.get(`http://localhost:5000/api/secret`, {responseType: 'json'});
  }
}
