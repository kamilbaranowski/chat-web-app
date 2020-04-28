import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private angularFireDatabase: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth) {

  }

  getUsers(): AngularFireList<User>{
    return this.angularFireDatabase.list('/users', user => {
      return user.orderByKey();
    })

    
  }

}

