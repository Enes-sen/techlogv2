import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Post } from '../addpostform/post';
import { User } from '../registerform/user';
import { PostService } from '../services/post.service';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-singlepost',
  templateUrl: './singlepost.component.html',
  styleUrls: ['./singlepost.component.css']
})
export class SinglepostComponent implements OnInit {
  postId: string;
  user: User;
  posted: Post;
  postCommentForm: FormGroup;
  serverURL = 'https://techlog-backend.onrender.com/api/users';

  constructor(
    private route: ActivatedRoute,
    private postServ: PostService,
    private alertServ: AlertifyService,
    private formBuilder: FormBuilder,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.postCommentForm = this.formBuilder.group({
      content: ['', Validators.required]
    });
    this.route.params.subscribe(params => {
      this.postId = params['id'];
      this.getPost();
    });
  }

  getPost(): void {
    if (this.postId) {
      this.postServ.getOne(this.postId).subscribe(
        (data: any) => {
          this.posted = data.post;
          console.log('posted:', this.posted);
          if (this.posted && this.posted.comments) {
            this.posted.commentCount = this.posted.comments.length;
          }
        },
        (error: any) => {
          console.log('hata:', error);
        }
      );
    }
  }


  checkOwner(userId: string): boolean {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    this.user = loggedUser;
    if (this.user && this.user._id === userId) {
      return true;
    } else {
      return false;
    }
  }

  deletePost(id: string): void {
    try {
      this.postServ.deletePost(id).subscribe(data => {
        console.log('data of deleted one:', data);
        if (data.success === false) {
          this.alertServ.danger(data.message);
        } else {
          this.alertServ.success(data.message);
         this.router.navigate(['posts']);
        }
      });
    } catch (err: any) {
      console.log(err.message);
      this.alertServ.danger('Hata sebebi: ' + err.message);
    }
  }
}
