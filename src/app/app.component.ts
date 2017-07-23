import { Component } from '@angular/core';
import { ApiServiceService } from './services/api-service.service';
// import { MasonryModule, MasonryOptions } from 'angular2-masonry';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ ApiServiceService ]
})
export class AppComponent {
  listOfSongs: Array<any> = [];
  newList;

  title = 'app';
  searchTerm: string;

  constructor(private api: ApiServiceService) {}

  findSongByMiddle(userInput) {
    this.api.findSongMiddle(userInput).subscribe(
      (result) => {
        this.newList = JSON.parse(result).message.body.track_list;
        console.log(JSON.parse(result).message.body.track_list)
      }
    )
  }

//   public myOptions: MasonryOptions = {
//     itemSelector: '.grid-item',
//     columnWidth: '.grid-item',
//     percentPosition: true
// };
}
