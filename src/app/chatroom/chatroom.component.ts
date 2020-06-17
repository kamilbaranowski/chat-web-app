import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { User } from '../model/User';
import { Message } from '../model/Message';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  currentUserUid: string;
  message: string = '';
  receiver: User = null;
  messages: Message[] = new Array;
  constructor(private chatService: ChatService, 
              private firebaseAuth: AuthService,
              private router: Router) {

}

  ngOnInit(): void {
    if (localStorage.getItem("token") == null) {
      this.router.navigate(['login']);
    }
  }


  receiveEvent(receiver: User){
    console.log('Chatroom receive: ' + receiver);
    this.receiver = receiver;
    this.getMessages();
  }

  sendMessage(){
    if (this.receiver !== null && this.message != ''){
      console.log(this.message);
      let currentMessage = new Message(this.currentUserUid, this.receiver.uid, this.message, Date.now());
      this.chatService.sendMessage(currentMessage)
        .then(result => {
          console.log("Message sent: " + JSON.stringify(result));
        })
        .catch(error => {
          console.log("Error while sending message: " + JSON.stringify(error));
        });
    }
    else {
      console.log("receiver: " + JSON.stringify(this.receiver));
      console.log("message: " + this.message);
    }
    this.message = '';
  }
  
  handleSubmit(){

  }

  getMessages(){
    const currentUsr = localStorage.getItem("currentUser");
    this.currentUserUid = JSON.parse(currentUsr)['uid'];
    console.log("Current User UID: " + this.currentUserUid);
    this.chatService.getMessages(this.currentUserUid, this.receiver.uid).snapshotChanges().subscribe(messages => {
      this.messages.splice(0);
        messages.forEach(message => {
          this.messages.push(message.payload.toJSON() as Message);
        }) 
    },
    error => {
      console.log(error);
    })
  }
}
