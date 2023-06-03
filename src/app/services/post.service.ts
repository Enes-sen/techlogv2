import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError, Subject } from 'rxjs';
import { Post } from '../addpostform/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postAdded$: Subject<any> = new Subject<any>();

  private baseUrl = 'http://localhost:3000/api/posts';

  constructor(private httpReq: HttpClient) { }
  
  // Diğer metodlar...

  createPost(post: Post): Observable<any> {
    try {
      let newpath = this.baseUrl + "/new";
      return this.httpReq.post(newpath, post).pipe(
        tap(data => {
          console.log(data._id);
          this.postAdded$.next(data); // Yeni bir gönderi oluşturulduğunda postAdded$ özelliğine sinyal gönderiyoruz
          return data;
        })
      );
    } catch (err) {
      console.log("message of err:", err);
      return throwError(err);
    }
  }

  deletePost(id: string): Observable<any> {
    let newPath = this.baseUrl + "/delete/" + id;
    return this.httpReq.delete(newPath).pipe(
      tap(data => {
        console.log("delete res:", data);
        this.postAdded$.next(data); // Bir gönderi silindiğinde postAdded$ özelliğine sinyal gönderiyoruz
      })
    );
  }

  addLike(id: string, userId: string): Observable<any> {
    let newPath = `${this.baseUrl}/like/${id}/${userId}`;
    return this.httpReq.get(newPath).pipe(
      tap(data => {
        console.log("data of postLike:", data);
        this.postAdded$.next(data); // Bir gönderiye beğeni eklendiğinde postAdded$ özelliğine sinyal gönderiyoruz
      })
    );
  }

  disLike(id: string, userId: string): Observable<any> {
    let newPath = `${this.baseUrl}/dislike/${id}/${userId}`;
    return this.httpReq.get(newPath).pipe(
      tap(data => {
        console.log("data of postDisLike:", data);
        this.postAdded$.next(data); // Bir gönderiden beğeni kaldırıldığında postAdded$ özelliğine sinyal gönderiyoruz
      })
    );
  }
}
