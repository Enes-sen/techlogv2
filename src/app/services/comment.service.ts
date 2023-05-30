import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CommEnt } from '../postcommentsform/comment';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private httpReq: HttpClient) {}
  path = 'https://techlog-backend.onrender.com/api/posts/comments';
  commentAdded$: Subject<any> = new Subject<any>();

  onChanges(): Observable<any> {
    return this.commentAdded$.asObservable();
  }

  getAll(id: string): Observable<any> {
    try {
      let newpath = this.path + '/All/' + id;
      return this.httpReq.get(newpath).pipe(
        tap((data) => {
          console.log("data of post comments:", data);
          return data;
        })
      );
    } catch (err) {
      console.log("message of err:", err);
      let error = err;
      return error;
    }
  }

  AddnewComment(data: CommEnt): Observable<any> {
    try {
      let newpath = this.path + '/addNew';
      return this.httpReq.post(newpath, data).pipe(
        tap((data) => {
          console.log("comment-data2:", data);
          this.commentAdded$.next(data); // Yorum eklendiğinde commentAdded$ özelliğine veri gönderiyoruz
          return data;
        })
      );
    } catch (err) {
      console.log("message of err:", err);
      let error = err;
      return error;
    }
  }

  deleteComment(comment: CommEnt): Observable<any> {
    let newPath = `${this.path}/delete/${comment._id}`;
    return this.httpReq.delete(newPath).pipe(
      tap((data) => {
        console.log("delete res:", data);
        this.commentAdded$.next(data); // Yorum silindiğinde commentAdded$ özelliğine veri gönderiyoruz
      })
    );
  }

  addLike(id: string, userid: string): Observable<any> {
    let newPath = `${this.path}/like/${id}/${userid}`;
    return this.httpReq.get(newPath).pipe(
      tap(data => {
        console.log("data of commentLike:", data);
        this.commentAdded$.next(data); // Beğeni eklendiğinde commentAdded$ özelliğine veri gönderiyoruz
      })
    );
  }

  dislike(id: string, userid: string): Observable<any> {
    let newPath = `${this.path}/dislike/${id}/${userid}`;
    return this.httpReq.get(newPath).pipe(
      tap(data => {
        console.log("data of commentDisLike:", data);
        this.commentAdded$.next(data); // Beğeni eklendiğinde commentAdded$ özelliğine veri gönderiyoruz
      })
    );
  }
}
