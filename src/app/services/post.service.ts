import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable,tap, throwError} from 'rxjs';
import { Post } from '../addpostform/post';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpReq:HttpClient) { }
  path="https://techlog-backend.onrender.com/api/posts";

  getall():Observable<any>{
    try {
      let newpath =this.path+"/All";
      return this.httpReq.get(newpath).pipe(tap(data=>{
        console.log(data);
        return data;
      }));
    } catch (err) {
      console.log("message of err:",err.message);
      let error= err;
      return error;
    }
  };
  getPostsByUserId(Id:string): Observable<any> {
    try {
      let newPath = this.path + "/All/" + Id; // add userId to the URL
      return this.httpReq.get(newPath).pipe(
        tap(data => {
          console.log("userid:",data.userid,"data:",data);
          return data;
        })
      );
    } catch (err) {
      console.log("Error message:", err);
      let error = err;
      return error;
    }
  }
  getOne(id: string): Observable<any> {
    let newPath = this.path + "/one/" + id;
    return this.httpReq.get(newPath).pipe(
      tap(data => {
        console.log("onepost:", data);
      }),
      catchError(err => {
        console.log("hata:", err);
        return throwError(err);
      })
    );
  }




  createPost(post:Post):Observable<any>{
    try {
      let newpath =this.path+"/new";
      return this.httpReq.post(newpath,post).pipe(tap(data=>{
        console.log(data._id);
        return data;
      }));
    } catch (err) {
      console.log("message of err:",err);
      let error= err;
      return error;
    }
  };
  deletepost(id:string):Observable<any>{
    let newPath = this.path+"/delete/"+id;
    return this.httpReq.delete(newPath).pipe(tap(data=>{
      console.log("delet res:",data);
    }))
  }
  addLike(id:string,userid:string): Observable<any>{
    let newPath = `${this.path}/like/${id}/${userid}`;
    return this.httpReq.get(newPath).pipe(tap(data=>{
      console.log("data of postLike:",data);
    }));
  }
  disLike(id:string,userid:string): Observable<any>{
    let newPath = `${this.path}/dislike/${id}/${userid}`;
    return this.httpReq.get(newPath).pipe(tap(data=>{
      console.log("data of postDisLike:",data);
    }));
  }

}
