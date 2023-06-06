import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, ReplaySubject, Subject } from 'rxjs';
import { CommEnt } from '../postcommentsform/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private httpReq: HttpClient) {}
  path = 'https://techlog-backend.onrender.com/api/posts/comments';
  private commentAddedSubject = new Subject<void>();


  commentAddedSuccessfully() {
    return this.commentAddedSubject.next()
  }

  onCommentAdded() {
    return this.commentAddedSubject.asObservable();
  }
  onChanges(): Observable<any> {
    return this.commentAddedSubject.asObservable();
  }

  getAll(id: string): Observable<any> {
    try {
      let newpath = this.path + '/All/' + id;
      return this.httpReq.get(newpath).pipe(
        tap((data) => {
          console.log('delete res:', data);
          this.commentAddedSubject.next(data);
        })
      );
    } catch (err) {
      console.log('message of err:', err);
      throw err;
    }
  }

  addNewComment(data: CommEnt): Observable<any> {
    try {
      let newpath = this.path + '/addNew';
      return this.httpReq.post(newpath, data).pipe(
        tap((data) => {
          console.log('delete res 2:', data);
          this.commentAddedSubject.next(data);
        })
      );
    } catch (err) {
      console.log('message of err:', err);
      throw err;
    }
  }

  deleteComment(comment: CommEnt): Observable<any> {
    let newPath = `${this.path}/delete/${comment._id}`;
    return this.httpReq.delete(newPath).pipe(
      tap((data) => {
        console.log('delete res:', data);
        this.commentAddedSubject.next(data);
      })
    );
  }

  addLike(id: string, userid: string): Observable<any> {
    let newPath = `${this.path}/like/${id}/${userid}`;
    return this.httpReq.get(newPath).pipe(
      tap((data) => {
        console.log('data of commentLike:', data);
        this.commentAddedSubject.next(data);
      })
    );
  }

  dislike(id: string, userid: string): Observable<any> {
    let newPath = `${this.path}/dislike/${id}/${userid}`;
    return this.httpReq.get(newPath).pipe(
      tap((data) => {
        console.log('data of commentDisLike:', data);
        this.commentAddedSubject.next(data);
      })
    );
  }
}
