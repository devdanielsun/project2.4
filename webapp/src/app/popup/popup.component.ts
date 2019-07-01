import { Component, OnInit, NgZone } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { PopupService } from './popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  animations: [
    trigger('dialog', [
        transition('void => *', [
          style({transform: 'scale3d(.3, .3, .3)'} ),
          animate(100)
          ]),
        transition('void => *', 
          animate(100, style({transform: 'scale3d(.3, .3, .3)'})))
      ])
    ]
})
export class PopupComponent implements OnInit {
//hide and show alert
modalStatus : boolean;
//custom settings
title: string;
type: string;
time: number;
body: string;
//default settings
color: string;
backColor: string;
constructor(
  private popupService : PopupService,
  private _ngZone : NgZone
  ) { }

  ngOnInit() {
    this.popupService.alertSetting$.subscribe(
      (data) => {
       this.title = data.title;
       this.type = data.type;
       this.time = data.time;
       this.body = data.body;
       if (this.type === 'danger'){
         this.backColor = '#dc3545';
       }
       if(this.type === 'infor' ){
         this.backColor = '#117a8b';
       }
       if (this.type === 'success'){
         this.backColor = '#28a745';
       }
       // show alert
       this.modalStatus = true;
            // hide alert after given time
       this._ngZone.runOutsideAngular(() =>
         setTimeout(() =>
           this._ngZone.run(() => 
             this.modalStatus = false
             ), this.time
           )
         )
      }
      );
  }
  // close alert afert click on ok and cross
  resolve() {
    this.modalStatus = false;
  }
}
