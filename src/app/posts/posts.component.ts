import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Post } from '../addpostform/post';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnChanges {
  posts: Post[] = [];
  user: any;
  serverURL = 'https://techlog-backend.onrender.com/api/users';
  postSubscription: Subscription;

  constructor(
    private postServ: PostService,
    private authServ: AuthService,
    private alertServ: AlertifyService
  ) {}

  ngOnInit(): void {
    this.getPosts();
    this.postSubscription = this.postServ.postAdded$.subscribe((data) => {
      // Yeni bir gönderi eklendiğinde veya mevcut bir gönderide değişiklik olduğunda burası çalışır
      console.log('Yeni gönderi eklendi veya gönderilerde değişiklik oldu:', data);
      // Değişimle ilgili başka işlemler yapabilirsiniz.
      this.getPosts(); // Gönderileri yeniden almak için getPosts() metodunu çağırıyoruz
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.posts) {
      // posts değişkeninde bir değişiklik olduğunda burası çalışır
      console.log('Posts değişti:', this.posts);
      // Değişimle ilgili başka işlemler yapabilirsiniz.
    }
  }

  ngOnDestroy(): void {
    // Aboneliği iptal ediyoruz
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }

  getPosts(): void {
    this.postServ.getAll().subscribe((data) => {
      const updatedPosts = data.map((post) => {
        return {
          ...post,
          postId: post._id
        };
      });

      this.user = JSON.parse(localStorage.getItem('loggedUser'));

      updatedPosts.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });

      this.posts = updatedPosts;
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
      this.postServ.dislike(post._id, id).subscribe((data) => {
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
