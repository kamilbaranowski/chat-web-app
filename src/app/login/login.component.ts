import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") != null) {
      this.router.navigate(['chat']);
    }
  }

  signIn(){
    this.authService.signIn(this.email, this.password).subscribe(
      result => {
      console.log(result['token'])
      localStorage.setItem("token", result['token']);
      this.authService.signInFirebase(result['token'])
      .then(loginStatus => {
        console.log('Sign In Success: ' + JSON.stringify(loginStatus));
        this.authService.getIdToken().subscribe(idToken => {
          localStorage.setItem("idToken", JSON.stringify(idToken));
          this.router.navigate(['chat']);
        })

      })
      .catch(error => console.log(error));
      },
      error => {
        console.log("Error while login: " + JSON.stringify(error));
      })
  }

}
