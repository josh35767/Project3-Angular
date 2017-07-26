import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { AuthServicesService } from '../services/auth-services.service';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;


  user: any;
  message;
  constructor(
    private api: ApiServiceService,
    private auth: AuthServicesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.checklogin()
      .then((user) => {
        this.user = user;
      })
      .catch((err) => {
        this.message = err;
      });

  this.auth.loggedIn$.subscribe((userStatus) => {

    if (userStatus) {
      if (this.isLoggedIn) {
        return;
      }
      this.isLoggedIn = true;
      this.user = userStatus;
    } else {
      this.isLoggedIn = false;
      this.user = null;
    }
  });
  }

  logout() {
    this.auth.logout()
      .then(() => {
        console.log("Log out successful!")
        this.checklogin();
      });
  }

  checklogin() {
    this.auth.checklogin()
    .then((userInfo) => {
       this.isLoggedIn = true;
       this.user = userInfo;
     })
     .catch((err) => {
       this.isLoggedIn = false;
     })
  }

}
