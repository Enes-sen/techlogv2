import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommEnt } from '../postcommentsform/comment';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-postcomments',
  templateUrl: './postcomments.component.html',
  styleUrls: ['./postcomments.component.css']
})
export class PostcommentsComponent implements OnInit, OnChanges {
  commentsofpost: CommEnt[];
  user: any = null;
  id: any;
  serverURL = 'https://techlog-backend.onrender.com/api/users';

  constructor(
    private commentServ: CommentService,
    private route: ActivatedRoute,
    private authServ: AuthService,
    private alertServ: AlertifyService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      console.log("id data:", data);
      this.id = data['id'];
    });
    this.user = JSON.parse(localStorage.getItem("loggedUser"));

    this.getComments();
    this.commentServ.onCommentAdded().subscribe(() => {
      // Yorum eklendiğinde yapılacak işlemler
      this.getComments();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['commentsofpost']) {
      console.log('commentsofpost değişti:', this.commentsofpost, "changes:", changes);
    }
  }

  checkOwner(userid: string): boolean {
    const loggedUserId = JSON.parse(localStorage.getItem("loggedUser"));
    return loggedUserId && loggedUserId._id === userid;
  }


  deleteComment(comment: CommEnt) {
    try {
      this.commentServ.deleteComment(comment).subscribe(
        (data) => {
          if (data.success === true) {
            this.alertServ.success("Yorum kaldırma başarılı");
            this.getComments();
          }
        },
        (err) => {
          console.log(err.message);
          this.alertServ.danger("Hata sebebi: " + err.message);
        }
      );
    } catch (err) {
      console.log(err.message);
      this.alertServ.danger("Hata sebebi: " + err.message);
    }
  }

  addlike(id: string, comment: CommEnt) {
    if (!id) {
      this.alertServ.danger("Bu özelliği kullanmak için giriş yapmanız gerekmektedir.");
      return;
    }

    this.commentServ.addLike(comment._id, id).subscribe(
      (data) => {
        if (data.success === true) {
          this.alertServ.success(data.message);
          this.getComments();
        } else {
          this.alertServ.danger(data.message);
          this.getComments();
        }
      },
      (err) => {
        console.log(err.message);
        this.alertServ.danger("Hata sebebi: " + err.message);
      }
    );
  }

  dislike(id: string, comment: CommEnt) {
    if (!id) {
      this.alertServ.danger("Bu özelliği kullanmak için giriş yapmanız gerekmektedir.");
      return;
    }

    this.commentServ.dislike(comment._id, id).subscribe(
      (data) => {
        if (data.success === true) {
          this.alertServ.success(data.message);
          this.getComments();
        } else {
          this.alertServ.danger(data.message);
          this.getComments();
        }
      },
      (err) => {
        console.log(err.message);
        this.alertServ.danger("Hata sebebi: " + err.message);
      }
    );
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

  checkLiked(comment: CommEnt): boolean {
    return this.user && comment?.likes.length > 0 && comment.likes.includes(this.user?._id);
  }

  loggedIn(): boolean {
    return this.authServ.loggedinuser;
  }

  showAlert() {
    this.alertServ.danger("Bu özelliği kullanmak için giriş yapmanız gerekmektedir.");
  }
}
