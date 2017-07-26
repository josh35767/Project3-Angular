import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { MasonryModule } from 'angular2-masonry';

import { AppRoutingModule } from './app-routing.module';
import { ApiServiceService } from './services/api-service.service';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ResultItemsComponent } from './search/results-list/result-items/result-items.component';
import { ByLyricComponent } from './search/by-lyric/by-lyric.component';
import { ByTrackComponent } from './search/by-track/by-track.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthServicesService } from './services/auth-services.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeaderComponent } from './header/header.component';
import { SavedComponent } from './saved/saved.component';
import { ResultComponent } from './search/result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ResultItemsComponent,
    ByLyricComponent,
    ByTrackComponent,
    LogInComponent,
    SignUpComponent,
    LandingPageComponent,
    HeaderComponent,
    SavedComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    MasonryModule
  ],
  providers: [
    ApiServiceService,
    AuthServicesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
