import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert } from './popup';

@Injectable({
    providedIn: 'root',
  })
  export class PopupService {
    alertSetting$ = new Subject<Alert>();

    constructor() {}
    create(
        title: string, type: string, time: number, body: string) {
            this.alertSetting$.next({
                title,
                type,
                time,
                body
            });
        }
    }
