import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { MasonryModule, MasonryOptions } from 'angular2-masonry';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  newList = [];
  display = 'trackSearch';

  title = 'app';
  searchTerm: string;

  ngOnInit() {

  }

  constructor(private api: ApiServiceService) {}

  displayResults(songArray) {
    this.newList = songArray;
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
