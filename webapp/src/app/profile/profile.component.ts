import { ProfileService } from './profile.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProfileI, FriendResponce } from './profile';
import { identifierModuleUrl } from '@angular/compiler';
import { PopupService } from '../popup/popup.service';

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

  isMe = true;
  alreadyFollowing = false;

  showMSG$: Observable<any>;

  constructor(private route: ActivatedRoute, private service: ProfileService, private router: Router, private popupService: PopupService) {
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
    if (id === localStorage.getItem('ID')) {
      this.isMe = true;
    } else {
      this.isMe = false;
    }
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
        if (this.followers && this.followers.message.followers && this.followers.message.following) {
          this.dupplexfollowers = 0;
          this.followers.message.followers.forEach(ers => {
            this.followers.message.following.forEach(ing => {
              if (ing.id === ers.id) {
                this.dupplexfollowers += 1;
              }
            });
          });
          this.alreadyFollowing = false;
          this.followers.message.followers.forEach( ers => {
            console.log(ers.id.toString() + ' ' + localStorage.getItem('ID'));
            if (ers.id.toString() === localStorage.getItem('ID')) {
              this.alreadyFollowing = true;
            }
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

  addFriend(fid: string) {
    this.service.addFriend(localStorage.getItem('ID'), fid).subscribe(
      (res) => {
        this.service.getUser(res.message.u2).subscribe(
          (result) => {
            console.log(res);
            this.popupService.create(
              'Following ' + result.message.name + ' ' + result.message.lastname, // title
              'success', // type
              3500, // time
              'Succesfully following ' + result.message.name + ' ' + result.message.lastname // body
            );
            this.getFriends(fid);
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
        this.popupService.create(
          'Something went wrong ' + err.message, // title
          'danger', // type
          3500, // time
          'Something went wrong ' + err.message, // body
        );
      }
    );
  }

  removeFriend(fid: string) {
    this.service.deleteFriend(localStorage.getItem('ID'), fid).subscribe(
      (res) => {
        this.popupService.create(
          'Unfollowing', // title
          'success', // type
          3500, // time
          'Succesfully unfollowed' // body
        );
        this.getFriends(fid);
      },
      (err) => {
        console.log(err);
        this.popupService.create(
          'Something went wrong ' + err.message, // title
          'danger', // type
          3500, // time
          'Something went wrong ' + err.message, // body
        );
      }
    );
  }

  showMap() {
    this.router.navigateByUrl(`/map`);
  }
}
