import { Injectable } from '@angular/core';
import {  throwError } from 'rxjs';

@Injectable()
export class AuthenticationServiceMock {
  constructor() { }

  login(username: string, password: string) {
      if (username=='lilan' && password=='lilan123'){
        let user = {
          id: '123',
          username: 'lilan',
          firstName: 'lilan',
          lastName: 'sameera',
          token: 'fake-jwt-token'
        };
      return user;
      } 
      else {
        return throwError({ error: { message: 'Username or password is incorrect' } });;
      }
  }
}