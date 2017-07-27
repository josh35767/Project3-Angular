import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthServicesService {

  private loggedInSource = new Subject<any>();

  loggedIn$ = this.loggedInSource.asObservable();

  constructor(
    private http: Http
  ) { }

  baseURL = environment.apiBase;

  signup(theUsername, thePassword) {
  return this.http
    .post(
      this.baseURL+'api/signup',
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
      this.baseURL+'api/login',
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
      this.baseURL+'api/logout',
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
        this.baseURL+'api/checklogin',
        { withCredentials: true }
      )
      .toPromise()
      .then(res => res.json())
      .then((userInfo) => {
        this.logInStatus(userInfo);
        return userInfo;
      });
  }

  removeSong(trackId) {
    return this.http.post(
      this.baseURL+"api/remove-song",
      {songId: trackId},
      {withCredentials: true}
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
