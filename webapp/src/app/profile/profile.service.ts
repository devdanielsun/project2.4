import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ProfileI } from './profile';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from 'selenium-webdriver/firefox';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  BackendCasper = 'http://csprl.nl:8088';

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getUser(id: string): Observable<ProfileI> {
    const myToken: any = this.authService.getToken();
    const me = this.httpClient.get<ProfileI>(`${this.BackendCasper}/user/${id}`);
    console.log(me);
    return me;
  }

  getFriends(id: string): Observable<any> {
    const myToken: any = this.authService.getToken();
    const myFriends = this.httpClient.get<ProfileI[]>(`${this.BackendCasper}/user/${id}/friends`, myToken);
    return myFriends;
  }

  getFriend(id: string) {
    return this.getFriends(id).pipe(
      // (+) before `id` turns the string into a number
      map((profiles: ProfileI[]) => profiles.find(user => user.userId === +id))
    );
  }

  addFriend(id: string, fid: string): Observable<ProfileI> {
    const friendProfile = this.getUser(fid);
    return this.httpClient.post<ProfileI>(`${this.BackendCasper}/user/${id}/friends/${fid}`, friendProfile);
  }

  deleteFriend(id: string, fid: string): Observable<{}> {
    return this.httpClient.delete(`${this.BackendCasper}/user/${id}/friends/${fid}`);
  }
}
