import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertifyService } from '../services/alertify.service';
import { PostService } from '../services/post.service';
import { Post } from './post';
import { User } from "../registerform/user";
import { Router } from '@angular/router';

@Component({
  selector: 'app-addpostform',
  templateUrl: './addpostform.component.html',
  styleUrls: ['./addpostform.component.css']
})
export class AddpostformComponent {
  postmodel: Post = new Post();
  Title = "Yeni Gönderi oluştur";
  user: User;

  constructor(private postService: PostService, private alertService: AlertifyService, private routes:Router) {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      this.user = JSON.parse(loggedUser); // Parse the string to JSON object
    }
  }

  create(form: NgForm) {
    this.postmodel.user = this.user;

    if (!this.postmodel.user) {
      this.alertService.danger("Bu işlemi yapabilmeniz için önce giriş yapmalısınız!");
    } else {
      this.postService.createPost(this.postmodel).subscribe(
        data => {
          console.log(data);
          if (data.success === false) {
            this.alertService.danger(data.message);
          } else {
            this.alertService.success("Gönderi başarılı bir şekilde kayıt edildi");
            this.routes.navigate(['dashboard']);
          }
        },
        error => {
          this.alertService.danger("Bir hata oluştu. Gönderi kaydedilemedi.");
          console.error(error);
        }
      );
    }
  }
}
