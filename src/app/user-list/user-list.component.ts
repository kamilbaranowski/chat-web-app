import { Component, OnInit, OnChanges } from '@angular/core';
import { User } from '../model/User';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnChanges {

  users: User[];

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.getUsers().valueChanges().subscribe(usersList => {
        this.users = usersList;
        console.log(this.users);
    })
  }

  ngOnChanges(){
    this.chatService.getUsers().valueChanges().subscribe(usersList => {
      this.users = usersList;
      console.log(this.users);
  })
  }

}
