import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../addpostform/post';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { CommentService } from '../services/comment.service';
import { PostService } from '../services/post.service';
import { CommEnt } from './comment';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-postcommentsform',
  templateUrl: './postcommentsform.component.html',
  styleUrls: ['./postcommentsform.component.css'],
})
export class PostcommentsformComponent implements OnInit {
  comentedpost: Post;
  commentModel: CommEnt = new CommEnt();
  Id = localStorage.getItem('loggedUser');
  destination = 'posts/';
  user = JSON.parse(this.Id);
  serverurl = 'https://techlog-backend.onrender.com/api/users';
  id: any;
  commentsofpost: CommEnt[];
  commentAdded$: Subject<void>;

  constructor(
    private postServ: PostService,
    private alertServ: AlertifyService,
    private authServ: AuthService,
    private routers: ActivatedRoute,
    private commentServ: CommentService,
    private routes: Router
  ) {
    this.commentAdded$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.routers.params.subscribe((params) => {
      const _id = params['id'];
      this.id = _id;
      this.destination += params['id'];
      this.postServ.getOne(_id).subscribe((data) => {
        try {
          this.comentedpost = data.post;
          console.log('comentpost:', this.comentedpost);
          this.getComments(); // Fetch comments initially
        } catch (err) {
          console.log('hata:', err.message);
          this.alertServ.danger(err.message);
        }
      });
    });

    // Değişiklikleri dinlemek için commentAdded$ aboneliği ekle
    this.commentAdded$.subscribe(() => {
      this.getComments();
    });
  }

  getComments(): void {
    this.commentServ.getAll(this.id).subscribe((data) => {
      this.commentsofpost = data.comments;
      this.commentsofpost.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
    });
  }

  logged() {
    return this.authServ.loggedinuser;
  }

 addComment(form: NgForm) {
  if (form.invalid) {
    return this.alertServ.danger('Yorum ekleme başarısız!');
  }
  this.commentModel.user = this.user;
  this.commentModel.post = this.comentedpost;
  if (this.commentModel.user && this.commentModel.post) {
    this.commentServ.AddnewComment(this.commentModel).subscribe((data) => {
      console.log('data of comment:', data);
      if (data.success === false) {
        this.alertServ.danger('Hata:' + data.message);
      } else {
        this.alertServ.success('Yorum eklendi');
        form.resetForm(); // Yorum formunu sıfırla
        this.getComments(); // Yorumlar yeniden yüklensin
      }
    });
  } else {
    this.alertServ.danger('Beklenmedik bir hata oluştu!');
  }
}

}
