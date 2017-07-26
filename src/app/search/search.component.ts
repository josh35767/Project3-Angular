import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { MasonryModule, MasonryOptions } from 'angular2-masonry';
import { AuthServicesService } from '../services/auth-services.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  newList = [];
  isLoggedIn;
  display = 'lyricSearch';
  user: any;
  message;

  searchTerm: string;
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
      });

    this.auth.loggedIn$.subscribe((userStatus) => {
      if (userStatus) {
        this.isLoggedIn = true;
        this.user = userStatus;
      } else {
        this.isLoggedIn = false;
        this.user = null;
      }
    });

  }

  constructor(
    private api: ApiServiceService,
    private auth: AuthServicesService
  ) {}

  displayResults(songArray) {
    this.newList = songArray;
    setTimeout(() => {
      location.href = "/search#results";
    }, 100);

  }

  //Changes if page searching by track/artist or by lyric

  changeSearch(swapTo) {
    if(swapTo === 'lyricSearch') {
      this.display = 'lyricSearch'
    }
    else {
      this.display = 'trackSearch'
    }
  }




  public myOptions: MasonryOptions = {
    itemSelector: '.grid-item',
    columnWidth: '.grid-item',
    percentPosition: true
  };
}
