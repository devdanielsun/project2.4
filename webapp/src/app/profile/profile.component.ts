import { ProfileService } from './profile.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProfileI, FriendResponce } from './profile';

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
  followers: FriendResponce;

  user$: Observable<ProfileI>;

  showMSG$: Observable<any>;

  constructor(private route: ActivatedRoute, private service: ProfileService) {
    this.mostVisitedCountry = 'Netherlands';
    this.amountVisitedCountries = -1;
    this.amountTravels = -1;
  }

  ngOnInit() {
    this.user$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getUser(params.get('id') ? params.get('id') : localStorage.getItem('ID'))
      )
    );

    this.service.getFollowers().subscribe(
      (res) => {
        this.followers = res;
      },
      (err) => console.log(err)
    );
  }

  addFriend() {
    alert ('No you cant');
  }

  showMap() {
    alert ('Go to map');
  }
}
