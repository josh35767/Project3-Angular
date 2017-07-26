import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import * as xml2js from 'xml2js';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiServiceService {
  songList = [];
  baseURL = "http://localhost:3000/";

  constructor(private http: Http) { }

  findSongMiddle(userInput) {
    return this.http.get(this.baseURL+"api/find/"+userInput).map(
      (res) => res.json())
  }

  findSongByTrack(userInput) {
    return this.http.post(this.baseURL+"api/findtracks/", userInput).map(
      (res) => res.json())
  }

  getTopTracks() {
    return this.http.get(this.baseURL + "api/top-tracks").map(res => res.json())
  }


  saveSong(songToSave) {
    return this.http.post(
      this.baseURL+"api/save-song",
      {
        songId: songToSave.songId,
        songArtist: songToSave.songArtist,
        songTitle: songToSave.songTitle,
        artistId: songToSave.artistId,
        lyricUrl: songToSave.lyricUrl
      },
    { withCredentials: true })
    .toPromise()
    .then(res => res.json())
  }

  getSongById(selectedId) {
    return this.http.get(this.baseURL+"api/song-by-id/"+selectedId)
      .toPromise()
      .then(res => res.json())
  }

  findRelated(artistId) {
    return this.http.get(this.baseURL+"api/find-related/"+artistId)
      .toPromise()
      .then(res => res.json())
  }

}
