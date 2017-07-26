import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from './services/api-service.service';
import { AuthServicesService } from './services/auth-services.service';

import 'rxjs/add/operator/map'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ ApiServiceService ]
})
export class AppComponent {
  isLoggedIn: boolean = false;
  userInfo = {};

  title = 'app';
  searchTerm: string;

  constructor(
    private api: ApiServiceService,
    private auth: AuthServicesService,

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

        this.userInfo = userInfo;
      })
      .catch((err) => {
        this.isLoggedIn = false;

      })
  }

}
