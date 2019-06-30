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
  BackendCasper: 'http://csprl.nl:8088';
  constructor(private httpClient: HttpClient) { }

  getUser(id: string): Observable<ProfileI> {
    return this.httpClient.get<ProfileI>(`${this.BackendCasper}/user/${id}`);
  }

  getFriends(id: string): Observable<ProfileI[]> {
    // TODO: send the message _after_ fetching the heroes
    const myFriends = this.httpClient.get<ProfileI[]>(`${this.BackendCasper}/user/${id}/friends`);
    return myFriends;
  }

  getFriend(id: string) {
    return this.getFriends(id).pipe(
      // (+) before `id` turns the string into a number
      map((profiles: ProfileI[]) => profiles.find(user => user.id === +id))
    );
  }

  addFriend(id: string, fid: string): Observable<ProfileI> {
    const friendProfile = this.getUser(fid);
    return this.httpClient.post<ProfileI>(`${this.BackendCasper}/user/${id}/friends/${fid}`, friendProfile);
  }

  deleteFriend(id: string, fid: string): Observable<{}> {
    return this.httpClient.delete(`${this.BackendCasper}/user/${id}/friends/${fid}`);
  }

  getSecret(): Observable<any> {
    return this.httpClient.get(`http://localhost:5000/api/secret`, {responseType: 'json'});
  }
}
