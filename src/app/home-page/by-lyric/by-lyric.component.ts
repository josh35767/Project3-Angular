import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-by-lyric',
  templateUrl: './by-lyric.component.html',
  styleUrls: ['./by-lyric.component.css']
})
export class ByLyricComponent implements OnInit {
  songList = [];
  @Output() onSearch = new EventEmitter<any>();
  @Output() onSwap = new EventEmitter<any>();


  constructor(private api:ApiServiceService) { }

  ngOnInit() {
  }

  findSongByLyric(userInput) {
    this.api.findSongMiddle(userInput).subscribe(
      (result) => {
        this.songList = JSON.parse(result).message.body.track_list;
        this.onSearch.emit(this.songList);
      }
    )
  }

  changeSearch() {
    this.onSwap.emit('trackSearch');
  }


}
