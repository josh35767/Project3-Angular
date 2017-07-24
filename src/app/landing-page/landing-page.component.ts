import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';

import { AngularMasonry, MasonryOptions } from 'angular2-masonry';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  providers: [AngularMasonry]
})
export class LandingPageComponent implements OnInit {
  topTracks = [];


  constructor(
    private api: ApiServiceService,
    private masonry: AngularMasonry
  ) { }

  ngAfterViewInit() {
      this.masonry.layoutComplete.subscribe(() => {
        console.log('layout');
      });
  }

  ngOnInit() {
    this.getTopTracks()
  }

  getTopTracks() {
    this.api.getTopTracks()
      .subscribe((tracks) => {
        console.log(JSON.parse(tracks));
        this.topTracks = JSON.parse(tracks).message.body.track_list;
      })
  }

  public myOptions: MasonryOptions = {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    transitionDuration: '0s',
    resize: true
  };

}
