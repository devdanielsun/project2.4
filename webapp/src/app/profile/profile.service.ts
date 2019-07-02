import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ProfileI, FriendResponce, addfriend } from './profile';
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

  getFollowers(id: string) {
    return this.httpClient.get<FriendResponce>(`${this.BackendCasper}/user/${id}/friends`).pipe(tap(
      (res: FriendResponce) => {
        if (res) {
          return res;
        }
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  addFriend(id: string, fid: string): Observable<addfriend> {
    return this.httpClient.post<addfriend>(`${this.BackendCasper}/user/${id}/friends/${fid}`, '').pipe(tap(
      (res: addfriend) => {
        console.log(res);
        return res;
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  deleteFriend(id: string, fid: string): Observable<any> {
    return this.httpClient.delete(`${this.BackendCasper}/user/${id}/friends/${fid}`).pipe(tap(
      (res) => {
        console.log(res);
        return res;
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  private saveUser(user: ProfileI['message']) {
    console.log(user);
    localStorage.setItem('ME', JSON.stringify(user));
  }
}
