import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServicesService } from '../services/auth-services.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  newUser: any = {
    username: "",
    password: "",
    confirm: ""
  };

  error: string;
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
  }

  signUp() {
    if (this.newUser.password !== this.newUser.confirm) {
      this.error = "Passwords do not match.";
      return;
    }
    this.auth.signup(this.newUser.username, this.newUser.password)
      .then((newUser) => {
        this.error = "";
        this.isSuccessful = true;
        setTimeout(() => {
          this.router.navigate([''])
        }, 2000)

      })
      .catch((err) => {
        const parsedError = err.json();
        this.error = parsedError.message;
      })
  }
}
