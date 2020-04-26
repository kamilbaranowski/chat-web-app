import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private angularFireAuth: AngularFireAuth,
              private angularFireDatabase: AngularFireDatabase) { 
               }

  signUp(email: string, password: string){
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  setUserData(userId: string, username: string, email: string, status: string){
    const path = `users/${userId}`;
    const userData = {
      email: email,
      username: username,
      status: status
    };
    this.angularFireDatabase.object(path).update(userData);
  }

}
