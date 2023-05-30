import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { PostsComponent } from './posts/posts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginformComponent } from './loginform/loginform.component';
import { RegisterformComponent } from './registerform/registerform.component';
import { AddpostformComponent } from './addpostform/addpostform.component';
import { DashboardpostsComponent } from './dashboardposts/dashboardposts.component';
import { HelpformComponent } from './helpform/helpform.component';
import { AlertifyService } from './services/alertify.service';
import { AuthService } from './services/auth.service';
import { LoginGuard } from './loginform/login.guard';
import { PostService } from './services/post.service';
import { SinglepostComponent } from './singlepost/singlepost.component';
import { UserSectionComponent } from './user-section/user-section.component';
import { PostcommentsComponent } from './postcomments/postcomments.component';
import { PostcommentsformComponent } from './postcommentsform/postcommentsform.component';
import { CommentService } from './services/comment.service';
import { UploadimageComponent } from './uploadimage/uploadimage.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PostsComponent,
    DashboardComponent,
    LoginformComponent,
    RegisterformComponent,
    AddpostformComponent,
    DashboardpostsComponent,
    HelpformComponent,
    SinglepostComponent,
    UserSectionComponent,
    PostcommentsComponent,
    PostcommentsformComponent,
    UploadimageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    AlertifyService,
    AuthService,
    LoginGuard,
    PostService,
    CommentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
