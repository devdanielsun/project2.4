import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ProfileI } from './profile';
import { FRIENDS } from './mock-friends';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  BackendCasper: '145.37.156.115:8080';
  constructor(private httpClient: HttpClient) { }

  getFriends(id: number): Observable<ProfileI[]> {
    // TODO: send the message _after_ fetching the heroes
    const myFriends = this.httpClient.get<ProfileI[]>(`${this.BackendCasper}/user/id/friends`);
    return myFriends;
  }
  getFriend(id: number | string) {
    return this.getFriends().pipe(
      // (+) before `id` turns the string into a number
      map((profiles: ProfileI[]) => profiles.find(user => user.id === +id))
    );
  }

  getSecret(): Observable<any> {
    return this.httpClient.get(`http://localhost:5000/api/secret`, {responseType: 'json'});
  }
}
