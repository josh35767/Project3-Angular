import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import {Observable} from 'rxjs/Rx';


@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  idParams;
  artistInfo: any;
  artistGenre = "Other";

  constructor(
    private route: ActivatedRoute,
    private api: ApiServiceService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idParams = params.id;
      console.log(params.id);
      this.getArtistInfo(params.id);
      this.api.getArtistTop(params.id)
        .then((res) => {
          console.log(JSON.parse(res));
        })
    })

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
