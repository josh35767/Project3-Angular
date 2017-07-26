import { Component, OnInit, Input} from '@angular/core';
import { AuthServicesService } from '../../services/auth-services.service';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  user: any;
  message: any;
  saveMessage: String;
  isLoggedIn: boolean;
  successMessageClass: String;
  successButtonClass: String;

  @Input() songInfo: any;

  constructor(
    private api: ApiServiceService,
    private auth: AuthServicesService
  ) { }

  ngOnInit() {
    this.auth.checklogin()
      .then((user) => {
        this.user = user;
      })
      .catch((err) => {
        this.message = err;
      });

    this.auth.loggedIn$.subscribe((userStatus) => {
      if (userStatus) {
        this.isLoggedIn = true;
        this.user = userStatus;
      } else {
        this.isLoggedIn = false;
        this.user = null;
      }
    });
  }


    // Saves Song to User's profile.

    saveSong(songToSave) {
      const newSong = {
        songId: songToSave.track_id,
        songArtist: songToSave.artist_name,
        songTitle: songToSave.track_name,
        artistId: songToSave.artist_id,
        lyricUrl: songToSave.track_share_url
      }
      console.log(newSong);

      this.api.saveSong(newSong)
        .then((updated) => {
          this.saveMessage = "Song successfully saved.";
          this.successButtonClass = "success-button";
          this.successMessageClass = "success-message";
          setTimeout(() => {
            this.saveMessage = "";
            this.successButtonClass = "";
            this.successMessageClass = "";
          }, 2000)
        })
        .catch((err) => {
          console.log(err);
          this.saveMessage = "Song already saved!"
          this.successButtonClass = "error-button";
          this.successMessageClass = "error-message";
          setTimeout(() => {
            this.saveMessage = "";
            this.successButtonClass = "";
            this.successMessageClass = "";
          }, 2000)
        });
    }

}