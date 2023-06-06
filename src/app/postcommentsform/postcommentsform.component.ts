// PostcommentsformComponent

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../addpostform/post';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { CommentService } from '../services/comment.service';
import { PostService } from '../services/post.service';
import { CommEnt } from './comment';

@Component({
  selector: 'app-postcommentsform',
  templateUrl: './postcommentsform.component.html',
  styleUrls: ['./postcommentsform.component.css'],
})
export class PostcommentsformComponent implements OnInit{
  comentedpost: Post;
  commentModel: CommEnt = new CommEnt();
  Id = localStorage.getItem('loggedUser');
  destination = 'posts/';
  user = JSON.parse(this.Id);
  serverurl = 'https://techlog-backend.onrender.com/api/users';
  id: any;
  commentsofpost: CommEnt[];

  constructor(
    private postServ: PostService,
    private alertServ: AlertifyService,
    private authServ: AuthService,
    private router: ActivatedRoute,
    private commentServ: CommentService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      const _id = params['id'];
      this.id = _id;
      this.destination += params['id'];
      this.postServ.getOne(_id).subscribe((data) => {
        try {
          this.comentedpost = data.post;
          console.log('comment post:', this.comentedpost);
          this.commentServ.onChanges().subscribe(() => {
            this.getComments(); // Fetch updated comments
          });
        } catch (err) {
          console.log('error:', err.message);
          this.alertServ.danger(err.message);
        }
      });
    });
  }

  logged() {
    return this.authServ.loggedinuser;
  }

  addComment(form: NgForm) {
    if (form.invalid) {
      return this.alertServ.danger('Failed to add comment!');
    }
    this.commentModel.user = this.user;
    this.commentModel.post = this.comentedpost;
    if (this.commentModel.user && this.commentModel.post) {
      this.commentServ.addNewComment(this.commentModel).subscribe((data) => {
        console.log('comment data:', data);
        if (data.success === false) {
          this.alertServ.danger('Error: ' + data.message);
        } else {
          this.alertServ.success('Comment added');
          this.commentServ.commentAddedSuccessfully();
          form.resetForm(); // Reset the comment form
        }
      });
    } else {
      this.alertServ.danger('An unexpected error occurred!');
    }
  }

  getComments(): void {
    this.commentServ.getAll(this.id).subscribe(data => {
      this.commentsofpost = data.comments;
      this.commentsofpost.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
    });
  }
}
