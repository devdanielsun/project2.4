import { ProfileService } from './profile.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProfileI, FriendResponce } from './profile';
import { identifierModuleUrl } from '@angular/compiler';

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
  dupplexfollowers: number;

  user: ProfileI;
  followers: FriendResponce;


  showMSG$: Observable<any>;

  constructor(private route: ActivatedRoute, private service: ProfileService, private router: Router) {
    this.mostVisitedCountry = 'Netherlands';
    this.amountVisitedCountries = -1;
    this.amountTravels = -1;
    this.dupplexfollowers = 0;
  }

  ngOnInit() {
    console.log('load profile');
    this.route.params.subscribe( params =>
      params['id'] ? this.doCallBack(params['id']) : this.doCallBack(localStorage.getItem('ID'))
    );
  }

  doCallBack(id: string): string {
    this.service.getUser(id).subscribe(
      (res) => {
        this.user = res;
        this.getFriends(id);
      },
      (err) => {
        console.log(err);
      }
    );
    return id;
  }

  getFriends(id: string) {
    this.service.getFollowers(id).subscribe(
      (res) => {
        console.log(res);
        this.followers = res;
        if (this.followers && this.followers.message.followers &&  this.followers.message.following) {
          this.dupplexfollowers = 0;
          this.followers.message.followers.forEach(ing => {
            this.followers.message.following.forEach(ers => {
              if (ing.id === ers.id) {
                this.dupplexfollowers += 1;
              }
            });
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }


  goToFriend(id: string) {
    this.router.navigateByUrl(`/profile/${id}`);
  }

  addFriend() {
    alert ('No you cant');
  }

  showMap() {
    alert ('Go to map');
  }
}
