import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthServicesService {

  private loggedInSource = new Subject<any>();

  loggedIn$ = this.loggedInSource.asObservable();

  constructor(
    private http: Http
  ) { }

  signup(theUsername, thePassword) {
  return this.http
    .post(
      'http://localhost:3000/api/signup',
      {
        signupUsername: theUsername,
        signupPassword: thePassword
      },

      // Send the cookies across domains
      { withCredentials: true }
    )
    .toPromise()
    .then(res => res.json())
    .then((userInfo) => {
      this.logInStatus(userInfo);
      return userInfo;
    });
}

login(theUsername, thePassword) {
  return this.http
    .post(
      'http://localhost:3000/api/login',
      {
        loginUsername: theUsername,
        loginPassword: thePassword
      },

      { withCredentials: true }
    )
    .toPromise()
    .then(res => res.json())
    .then((userInfo) => {
      this.logInStatus(userInfo);
      return userInfo;
    });
}

logout() {
  return this.http
    .post(
      'http://localhost:3000/api/logout',
      {},
      { withCredentials: true }
    )
    .toPromise()
    .then(res => res.json())
    .then((userInfo) =>{
      this.logInStatus(false);
      return userInfo;
    });
}

  checklogin() {
    return this.http
      .get(
        'http://localhost:3000/api/checklogin',
        { withCredentials: true }
      )
      .toPromise()
      .then(res => res.json())
      .then((userInfo) => {
        this.logInStatus(userInfo);
        return userInfo;
      });
  }

  logInStatus(userStatus) {
    this.loggedInSource.next(userStatus);
  }

}
