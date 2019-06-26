import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProfileI } from './profile';
import { FRIENDS } from './mock-friends';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  constructor() { }

  getFriends(): Observable<ProfileI[]> {
    // TODO: send the message _after_ fetching the heroes
    return of(FRIENDS);
  }

  getFriend(id: number | string) {
    return this.getFriends().pipe(
      // (+) before `id` turns the string into a number
      map((profiles: ProfileI[]) => profiles.find(user => user.id === +id))
    );
  }
}