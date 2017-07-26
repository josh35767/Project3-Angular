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
  user;
  message;
  relatedIdArray = [];
  relatedArray = [];
  songList = [];
  i = 0;


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
        this.doNext();
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

  getArtistIdCount() {
    let counts = {};
    this.user.favorites.forEach((oneFavorite) => {
      // Takes the user's favorites, and returns and object with the count of how many time each artist appearrs.
      counts[oneFavorite.artistId] = (counts[oneFavorite.artistId] || 0)+1;
    });
    // Saves the artist ID                      Determines which artist appears the most based off the count
    this.relatedIdArray = Object.keys(counts).sort(function(a, b){ return counts[b] - counts[a] });

  }


// Loop to find related Artist, to user's top artist, if there aren't related artists, it tries the next.
  doNext() {
    this.getArtistIdCount();
    if (this.i > this.relatedIdArray.length) {
      return;
    }
    this.api.findRelated(this.relatedIdArray[this.i])
      .then((result) => {
        if (typeof JSON.parse(result).message.body.artist_list === "object") {
          if (JSON.parse(result).message.body.artist_list.length === 0) {
            this.i += 1;
            this.doNext();
          }
          console.log("Finished" + this.relatedIdArray[this.i]);
          console.log(JSON.parse(result));
          this.relatedArray = JSON.parse(result).message.body.artist_list;
          this.i = 0;
          return;
        }
        console.log("No body");
        console.log(JSON.parse(result));
        this.i += 1;
        this.doNext();

      })
      .catch((err) => {console.log(err)})

  }



  // if (message.body.artist_list.length)

  public myOptions: MasonryOptions = {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    transitionDuration: '0s',
    resize: true
  };

}
