import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthServicesService } from '../../services/auth-services.service';


@Component({
  selector: 'app-saved-results',
  templateUrl: './saved-results.component.html',
  styleUrls: ['./saved-results.component.css']
})
export class SavedResultsComponent implements OnInit {
  @Input() oneSong: any;
  @Output() onSongDelete = new EventEmitter<any>();

  constructor(
    private auth: AuthServicesService
  ) { }

  ngOnInit() {
  }

  removeSong(trackId) {
    this.auth.removeSong(trackId)
      .then((user) => {
        this.onSongDelete.emit(user);
        console.log(trackId);
      })
  }


}
