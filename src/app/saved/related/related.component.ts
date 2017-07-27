import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { AuthServicesService } from '../../services/auth-services.service';

@Component({
  selector: 'app-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.css']
})
export class RelatedComponent implements OnInit {
  user: any;
  message: any;
  i: number = 0;
  relatedIdArray = [];
  relatedArray = [];

  constructor(
    private auth: AuthServicesService,
    private api: ApiServiceService
  ) { }

  ngOnInit() {
    this.auth.checklogin()
      .then((user) => {
        this.user = user;
        this.getRelated();
      })
      .catch((err) => {
        this.message = err;
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
  getRelated() {
    this.getArtistIdCount();
    if (this.i > this.relatedIdArray.length) {
      return;
    }
    this.api.findRelated(this.relatedIdArray[this.i])
      .then((result) => {
        if (typeof JSON.parse(result).message.body.artist_list === "object") {
          if (JSON.parse(result).message.body.artist_list.length === 0) {
            this.i += 1;
            this.getRelated();
          }
          this.relatedArray = JSON.parse(result).message.body.artist_list;
          this.i = 0;
          return;
        };
        this.i += 1;
        this.getRelated();

      })
      .catch((err) => {console.log(err)})

  }


}
