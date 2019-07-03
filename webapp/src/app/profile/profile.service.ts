import { ConfigService } from './../config.service';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ProfileI, FriendResponce, addfriend } from './profile';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  constructor(private httpClient: HttpClient, private config: ConfigService) { }

  getUser(id: string): Observable<ProfileI> {
    const url = this.config.getBackendUrl() + '/user/' + id;
    const me = this.httpClient.get<ProfileI>(url).pipe(tap(
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
    const url = this.config.getBackendUrl() + '/user/' + id + '/friends';
    return this.httpClient.get<FriendResponce>(url).pipe(tap(
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
    const url = this.config.getBackendUrl() + '/user/' + id + '/friends/' + fid;
    return this.httpClient.post<addfriend>(url, '').pipe(tap(
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
    const url = this.config.getBackendUrl() + '/user/' + id + '/friends/' + fid;
    return this.httpClient.delete(url).pipe(tap(
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
