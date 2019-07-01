import { PopupService } from './../popup/popup.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  constructor(private auth: AuthService, private popupService: PopupService) {
  }
  @Output() closeEvent: EventEmitter<string> = new EventEmitter();
  hideMenu() {
    this.closeEvent.emit('in');
  }

  ngOnInit() {
    this.isLoggedIn$ = this.auth.isLoggedIn;
    console.log(this.isLoggedIn$);
  }
  logout() {
    this.auth.logout();
    this.hideMenu();
    this.Popup('Logged out!', 'danger', 'You are no longer logged in!');
  }
  Popup(title: string, type: string, msg: string) {
    this.popupService.create(
      title, // title
      type, // type
      3500, // time
      msg // body
      );
  }
}
