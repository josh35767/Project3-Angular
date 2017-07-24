import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthServicesService {

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
    .then(res => res.json());
}

logout() {
  return this.http
    .post(
      'http://localhost:3000/api/logout',
      {},
      { withCredentials: true }
    )
    .toPromise()
    .then(res => res.json());
}

checklogin() {
  return this.http
    .get(
      'http://localhost:3000/api/checklogin',
      { withCredentials: true }
    )
    .toPromise()
    .then(res => res.json());
}

}
