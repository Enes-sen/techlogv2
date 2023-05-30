import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Post } from '../addpostform/post';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnChanges {
  posts: Post[] = [];
  user: any;
  path: string = "/";

  constructor(
    private postServ: PostService,
    private authServ: AuthService,
    private alertServ: AlertifyService
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['posts']) {
      // posts değişkeninde bir değişiklik olduğunda burası çalışır
      console.log('Posts değişti:', this.posts);
      // Değişimle ilgili başka işlemler yapabilirsiniz.
    }
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

      this.loggedIn(); // loggedIn() yöntemini burada çağırın
    });
  }



  loggedIn(): boolean {
    return this.authServ.loggedinuser;
  }

  checkOwner(userId: string): boolean {
    return userId === this.user?._id;
  }

  checkLiked(userId: string): boolean {
    return this.posts.some((post) => post.likes.includes(userId));
  }

  dislike(id: string, post: Post) {
    try {
      this.postServ.disLike(post._id, id).subscribe((data) => {
        if (data.success === false) {
          this.alertServ.danger(data.message);
        } else {
          this.alertServ.success(data.message);
          this.getPosts(); // Posts yeniden yüklensin
        }
      });
    } catch (err) {
      console.log('err:', err.message);
      this.alertServ.danger('hata:' + err.message);
    }
  }
  alert() {
    this.alertServ.danger("Bu özelliği kullanmak için giriş yapmanız gerekmektedir.");
  }

  addlike(id: string, post: Post) {
    try {
      this.postServ.addLike(post._id, id).subscribe((data) => {
        if (data.success === false) {
          this.alertServ.danger(data.message);
        } else {
          this.alertServ.success(data.message);
          this.getPosts(); // Posts yeniden yüklensin
        }
      });
    } catch (err) {
      console.log('err:', err.message);
      this.alertServ.danger('hata:' + err.message);
    }
  }
}
