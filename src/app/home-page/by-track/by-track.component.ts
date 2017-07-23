import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-by-track',
  templateUrl: './by-track.component.html',
  styleUrls: ['./by-track.component.css']
})
export class ByTrackComponent implements OnInit {
  userInput = {
    track: "",
    artist: ""
  }
  songList = [];
  @Output() onSearch = new EventEmitter<any>();
  @Output() onSwap = new EventEmitter<any>();


  constructor(private api: ApiServiceService) { }

  ngOnInit() {
  }

  findSongByTrack(userInput) {
    this.api.findSongByTrack(userInput).subscribe(
      (result) => {
        this.songList = JSON.parse(result).message.body.track_list;
        this.onSearch.emit(this.songList);
      }
    )
  }

  changeSearch() {
    this.onSwap.emit('lyricSearch');
  }
}
