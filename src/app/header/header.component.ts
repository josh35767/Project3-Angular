import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { AuthServicesService } from '../services/auth-services.service';

import 'rxjs/add/operator/map'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  userInfo = {};
  constructor(
    private api: ApiServiceService,
    private auth: AuthServicesService
  ) {}

  ngOnInit() {

  }

  logout() {
    this.auth.logout()
      .then(() => {
        console.log("Log out successful!")
      });
  }

  checklogin() {
    this.auth.checklogin()
      .then((userInfo) => {
        this.isLoggedIn = true;
        alert(userInfo);
        this.userInfo = userInfo;
      })
      .catch((err) => {
        this.isLoggedIn = false;
        alert("Not Logged In")
      })
  }
}
