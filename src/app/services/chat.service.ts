import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../model/User';
import { Message } from '../model/Message';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConnectionInfo } from '../model/ConnectionInfo';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  connectionInfo: ConnectionInfo;
  messages: AngularFireList<Message>;
  constructor(private angularFireDatabase: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private httpClient: HttpClient) {
      this.connectionInfo = new ConnectionInfo();
  }

  getUsers() {
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('idToken'))
  };

    return this.httpClient.get(this.connectionInfo.getServer() + "/users", options);
  }

  getUserById(userId: string): AngularFireObject<User>{
    const path = `users/${userId}`;
    return this.angularFireDatabase.object(path);
  }

  sendMessage(message: Message){
    this.angularFireDatabase.database
      .ref(`/messages/${message.receiver}/${message.sender}`)
      .push(message);
    return this.angularFireDatabase.database
      .ref(`/messages/${message.sender}/${message.receiver}`)
      .push(message);
  }

  getMessages(sender: string, receiver: string): AngularFireList<Message>{
    return this.angularFireDatabase.list(`/messages/${sender}/${receiver}`, ref => {
      return ref.limitToLast(25).orderByKey();
    });
  }
}
