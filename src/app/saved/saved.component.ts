import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { AuthServicesService } from '../services/auth-services.service';
import { Router } from '@angular/router';
import { AngularMasonry, MasonryOptions } from 'angular2-masonry';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css'],
  providers: [AngularMasonry]
})
export class SavedComponent implements OnInit {
  isLoggedIn: boolean;
  suggestedArtists: any;
  user: any = {

  };
  message;
  relatedIdArray = [];
  relatedArray = [];
  songList = [];



  constructor(
    private api: ApiServiceService,
    private masonry: AngularMasonry,
    private auth: AuthServicesService,
    private router: Router
  ) { }

  ngAfterViewInit() {
       window.scrollTo(0, 0);
   }

  ngOnInit() {
    this.auth.checklogin()
      .then((user) => {
        this.user = user;
      })
      .catch((err) => {
        this.message = err;
        this.router.navigate(['']);
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


  setUser(userInfo) {
    this.user = userInfo;
  }

  public myOptions: MasonryOptions = {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    transitionDuration: '0s',
    resize: true,
    horizontalOrder: true
  };



}
