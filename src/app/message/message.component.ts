import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../model/Message';
import { AuthService } from '../services/auth.service';
import { error } from 'protractor';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() messageInfo: Message;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  getCurrentUserUid() {
    let userUid;
    const user = JSON.parse(localStorage.getItem("currentUser"));
    userUid = user.uid;
    return user.uid;
  }

  isCurrentUser(uid: string){
    if (uid === this.getCurrentUserUid()){
      return true;
    } else {
      return false;
    }
  }

}
