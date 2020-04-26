import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  signUp(){
    this.authService.signUp(this.email, this.password)
      .then(userCredential => {
        console.log('RegistrationComponent User:');
        console.log(userCredential);
        const userStatus = 'online';
        this.authService.setUserData(userCredential.user.uid, 
                                    this.username, userCredential.user.email, userStatus);
        this.router.navigate(['chat']);
      })
      .catch(error => {
        console.log('Sign Up error: ' + error);
      })

  }

}
