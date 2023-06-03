import { Component, OnInit } from '@angular/core';
import { Post } from '../addpostform/post';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  user: any;
  serverURL = 'https://techlog-backend.onrender.com/api/users';

  constructor(
    private postServ: PostService,
    private authServ: AuthService,
    private alertServ: AlertifyService
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postServ.getall().subscribe((data) => {
      this.posts = data.posts.map((post) => {
        return {
          ...post,
          postId: post._id
        };
      });

      this.user = JSON.parse(localStorage.getItem('loggedUser'));

      this.posts.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
    });
  }

  loggedIn(): boolean {
    return this.authServ.loggedinuser;
  }

  checkOwner(userId: string): boolean {
    return userId === this.user?._id;
  }

  checkLiked(userId: string, post: Post): boolean {
    return post.likes.includes(userId);
  }

  dislike(id: string, post: Post): void {
    try {
      this.postServ.disLike(post._id, id).subscribe((data) => {
        if (data.success === false) {
          this.alertServ.danger(data.message);
        } else {
          this.alertServ.success(data.message);
          post.likes = post.likes.filter((like) => like !== id); // Remove the user's like from the post object
        }
      });
    } catch (err) {
      console.log('err:', err.message);
      this.alertServ.danger('hata:' + err.message);
    }
  }

  alert(): void {
    this.alertServ.danger("Bu özelliği kullanmak için giriş yapmanız gerekmektedir.");
  }

  addlike(id: string, post: Post): void {
    try {
      this.postServ.addLike(post._id, id).subscribe((data) => {
        if (data.success === false) {
          this.alertServ.danger(data.message);
        } else {
          this.alertServ.success(data.message);
          post.likes.push(id); // Add the user's like to the post object
        }
      });
    } catch (err) {
      console.log('err:', err.message);
      this.alertServ.danger('hata:' + err.message);
    }
  }
}
