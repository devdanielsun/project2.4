import { ProfileService } from './profile.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProfileI } from './profile';

@Component({
  selector: 'app-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  name: string;
  lastname: string;
  email: string;

  mostVisitedCountry: string;
  amountVisitedCountries: number;
  amountTravels: number;

  selectedId: number;
  friends$: Observable<ProfileI[]>;
  user$: Observable<ProfileI>;

  showMSG$: Observable<any>;

  constructor(private route: ActivatedRoute, private service: ProfileService) {
    this.mostVisitedCountry = 'Netherlands';
    this.amountVisitedCountries = 4;
    this.amountTravels = 42;
  }

  ngOnInit() {
    this.user$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getFriend(params.get('id') ? params.get('id') : localStorage.getItem('ID'))
      )
    );

    this.friends$ = this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = + params.get('id');
        return this.service.getFriends(this.selectedId.toString());
      })
    );

    this.showMSG$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.service.getSecret();
      })
    );
  }

  addFriend() {
    alert ('No you cant');
  }

  showMap() {
    alert ('Go to map');
  }
}
