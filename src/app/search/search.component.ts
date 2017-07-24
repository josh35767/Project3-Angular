import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { MasonryModule, MasonryOptions } from 'angular2-masonry';

@Component({
  selector: 'app-home-page',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  newList = [];
  display = 'lyricSearch';

  title = 'app';
  searchTerm: string;
  ngAfterViewInit() {
       window.scrollTo(0, 0);
   }

  ngOnInit() {

  }

  constructor(private api: ApiServiceService) {}

  displayResults(songArray) {
    this.newList = songArray;
    setTimeout(() => {
      location.href = "/search#results";
    }, 100); 

  }

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
