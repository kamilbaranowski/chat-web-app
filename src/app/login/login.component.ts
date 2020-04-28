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
  }

  signIn(){
    this.authService.signIn(this.email, this.password)
      .then(loginStatus => {
        console.log('Sign In Success:');
        console.log(loginStatus);
        this.router.navigate(['chat']);
      })
      .catch(error => console.log(error));
  }

}
