import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { AuthServicesService } from '../services/auth-services.service';
import {Observable} from 'rxjs/Rx';
import { AngularMasonry, MasonryOptions } from 'angular2-masonry';


@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  idParams;
  isLoggedIn: boolean = false;
  user: any;
  message: any;
  artistInfo: any;
  artistGenre = "Other";
  topTracks: any;

  constructor(
    private route: ActivatedRoute,
    private api: ApiServiceService,
    private auth: AuthServicesService
  ) {
  }

  ngOnInit() {
    // Gets artist Info and top tracks.
    this.route.params.subscribe((params) => {
      this.idParams = params.id;
      console.log(params.id);
      this.getArtistInfo(params.id);
      this.api.getArtistTop(params.id)
        .then((res) => {
          console.log(JSON.parse(res));
          this.topTracks = JSON.parse(res).message.body.track_list;
        })
    })

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

  getArtistInfo(id) {
    this.api.getArtistInfo(id)
      .then((artistInfo) => {
        this.artistInfo = JSON.parse(artistInfo).message.body.artist;
        this.artistGenre = this.artistInfo.primary_genres.music_genre_list[0].music_genre.music_genre_name;
        console.log(JSON.parse(artistInfo).message.body.artist);
      })
  }

}
