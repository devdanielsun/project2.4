import { Component, OnInit } from '@angular/core';

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
  totalfriends: number;

  userimg: string;

  constructor() {
    this.name = 'Daniel';
    this.lastname = 'Codeerts';
    this.email = 'info@codeerts.nl';

    this.mostVisitedCountry = 'Netherlands';
    this.amountVisitedCountries = 4;
    this.amountTravels = 42;
    this.totalfriends = -1;

    this.userimg = '../../assets/default-user.jpg';
  }

  ngOnInit() {
  }

  addFriend() {
    alert ('No you cant');
  }

  showMap() {
    alert ('Go to map');
  }

}
