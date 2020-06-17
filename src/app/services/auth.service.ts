import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable , of } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/User';
import { ConnectionInfo } from '../model/ConnectionInfo';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  connectionInfo: ConnectionInfo;
  constructor(private httpClient: HttpClient,
              private angularFireAuth: AngularFireAuth,
              private angularFireDatabase: AngularFireDatabase) { 
                this.connectionInfo = new ConnectionInfo();
               }

  signUp(user){
    let body = new URLSearchParams()
    body.set("username", user.username)
    body.set("email", user.email)
    body.set("password", user.password)
    body.set("status", "online")
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.httpClient.post(this.connectionInfo.getServer() + "/register", body.toString(), options);
  }

  setUserData(userId: string, username: string, email: string, status: string){
    const path = `users/${userId}`;
    const userData = {
      uid: userId,
      email: email,
      username: username,
      status: status
    };
    this.angularFireDatabase.object(path).update(userData);
  }

  signIn(email: string, password: string){    
    let body = new URLSearchParams()
    body.set("email", email)
    body.set("password", password)
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.httpClient.post(this.connectionInfo.getServer() + "/", body.toString(), options);
  }

  signInFirebase(token: string){
    return this.angularFireAuth.signInWithCustomToken(token)
  }

  listenForAuthStateChanges(){
    this.angularFireAuth.onAuthStateChanged(user => {
      if (user) {
        //console.log("User logged in: " + JSON.stringify(user));
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        console.log("User logged out.")
      }
    });
    
  }

  getUsernameByUid(uid: string){
    return this.httpClient.get(this.connectionInfo.getServer() + `/users?uid=${uid}`);
  }

  logout() {
    localStorage.clear();
    return this.angularFireAuth.signOut;
  }

  getIdToken() {
    const idToken = this.angularFireAuth.idToken;
    console.log("ID TOKEN: ");
    console.log(idToken);
    return idToken;
  }
  verifyLoggedInUser() {
    if (localStorage.getItem('token') != null) {
      return true;
    } else {
      return false;
    }
  }
}
