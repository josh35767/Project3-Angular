import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { MasonryModule } from 'angular2-masonry';

import { AppRoutingModule } from './app-routing.module';
import { ApiServiceService } from './services/api-service.service';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ResultItemsComponent } from './home-page/results-list/result-items/result-items.component';
import { ByLyricComponent } from './home-page/by-lyric/by-lyric.component';
import { ByTrackComponent } from './home-page/by-track/by-track.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ResultItemsComponent,
    ByLyricComponent,
    ByTrackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    MasonryModule
  ],
  providers: [ApiServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
