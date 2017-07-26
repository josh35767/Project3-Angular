import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { AuthServicesService } from '../services/auth-services.service';
import { AngularMasonry, MasonryOptions } from 'angular2-masonry';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  providers: [AngularMasonry]
})
export class LandingPageComponent implements OnInit {
  topTracks = [];
  isLoggedIn: boolean;
  user: any;
  message;


  constructor(
    private api: ApiServiceService,
    private masonry: AngularMasonry,
    private auth: AuthServicesService
  ) { }


  ngOnInit() {
    this.getTopTracks();
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

  getTopTracks() {
    this.api.getTopTracks()
      .subscribe((tracks) => {
        this.topTracks = JSON.parse(tracks).message.body.track_list;
        console.log(this.topTracks);
      })
  }

  public myOptions: MasonryOptions = {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    transitionDuration: '0s',
    resize: true
  };

}
