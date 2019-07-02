import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ProfileI, FriendResponce } from './profile';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  BackendCasper = 'http://csprl.nl:8088';

  constructor(private httpClient: HttpClient) { }

  getUser(id: string): Observable<ProfileI> {
    const me = this.httpClient.get<ProfileI>(`${this.BackendCasper}/user/${id}`).pipe(tap(
      (res: ProfileI) => {
        if (res && res.userId === res.message.id) {
          this.saveUser(res.message);
        }
      },
      (err) => {
        console.log(err);
      }
    ));
    return me;
  }

  getFriends(id: string): Observable<any> {
    const myFriends = this.httpClient.get<ProfileI[]>(`${this.BackendCasper}/user/${id}/friends`);
    return myFriends;
  }

  getFriend(id: string) {
    return this.getFriends(id).pipe(
      // (+) before `id` turns the string into a number
      map((profiles: ProfileI[]) => profiles.find(user => user.message.id === +id))
    );
  }

  getFollowers(id: string) {
  return this.httpClient.get<FriendResponce>(`${this.BackendCasper}/user/${id}/friends`).pipe(tap(
    (res: FriendResponce) => {
      if (res) {
        return res;
      }
    }
  ));
  }

  addFriend(id: string, fid: string): Observable<ProfileI> {
    const friendProfile = this.getUser(fid);
    return this.httpClient.post<ProfileI>(`${this.BackendCasper}/user/${id}/friends/${fid}`, friendProfile);
  }

  deleteFriend(id: string, fid: string): Observable<{}> {
    return this.httpClient.delete(`${this.BackendCasper}/user/${id}/friends/${fid}`);
  }

  private saveUser(user: ProfileI['message']) {
    console.log(user);
    localStorage.setItem('ME', JSON.stringify(user));
  }
}
