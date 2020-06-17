import { Component, OnInit, OnChanges, Output } from '@angular/core';
import { User } from '../model/User';
import { ChatService } from '../services/chat.service';
import { EventEmitter } from '@angular/core';




@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = new Array;
  @Output() notifyChatroomComponent = new EventEmitter();
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
   this.chatService.getUsers().subscribe(result => {
     console.log(result);
     Object.keys(result).forEach(key => {
          console.log(result[key]['email']);
          this.users.push(result[key] as User);
       });
      
     console.log(this.users);
     
   },
   error => {
    console.log("Error while fetching users: " + JSON.stringify(error));
   })
   console.log(this.users);
  }

  showThread(user: User){
    console.log("Showing thread... " + JSON.stringify(user));
    this.notifyChatroomComponent.emit(user);
  }

}
