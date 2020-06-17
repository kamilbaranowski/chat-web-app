import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { AuthService } from './services/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { NavbarComponent } from './navbar/navbar.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageComponent } from './message/message.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ChatroomComponent,
    NavbarComponent,
    UserListComponent,
    UserComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
