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
  constructor(private auth: AuthService) {
  }
  @Output() closeEvent: EventEmitter<string> = new EventEmitter();
  hideMenu() {
    this.closeEvent.emit('in');
  }

  ngOnInit() {
    this.isLoggedIn$ = this.auth.isLoggedIn;
    console.log(this.isLoggedIn$);
  }
}
