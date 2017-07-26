import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServicesService } from '../services/auth-services.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  username: string = "";
  password: string = "";
  user: any;

  error: string = "";
  isSuccessful: boolean = false;

  constructor(
    private auth: AuthServicesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.checklogin()
      .then(() => {
        this.router.navigate(['']);
      })
      .catch(() => {})
  }

  logIn() {
    this.auth.login(this.username, this.password)
      .then((theUser) => {
        this.error = "";
        this.isSuccessful = true;
        setTimeout(() => {
          this.router.navigate(['/search'])
        }, 2000)

      })
      .catch((err) => {
        const parsedError = err.json();
        this.error = parsedError.message;
      })
  }

}
