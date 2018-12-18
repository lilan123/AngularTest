import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AlertServiceMock {
  constructor() { }

    getMessage(): Observable<any> {
        return new Observable<any>();
    }

}