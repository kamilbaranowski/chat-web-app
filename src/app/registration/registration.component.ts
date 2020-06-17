import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../model/User';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  username: string;
  email: string;
  password: string;
  retypedPassword: string;

  registrationStatus: boolean = false;
  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  signUp() {
    if (this.password == this.retypedPassword) {
      const user = {
        "username": this.username,
        "email": this.email,
        "password": this.password,
        "status": "online"
      }
      this.authService.signUp(user).subscribe(result => {
        console.log("Sign UP successful: " + JSON.stringify(result));
        this.registrationStatus = true;
      },
        error => {
          console.log("Error while registration: " + JSON.stringify(error));
        });
    }
  }
  okSignInButton() {
    this.router.navigate(['login']);
  }
}
