import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,tap,throwError} from 'rxjs';
import { HelpRequest } from '../helpform/helprequest';
import { User } from '../registerform/user';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  path="https://techlog-backend.onrender.com/api/users";
  loggedinuser:boolean = false;

  register(user: User): Observable<any> {
    let newpath = this.path + "/register";
    return this.http.post(newpath, user).pipe(tap(data=>{
      console.log(JSON.stringify(data));
    }));
  }
  login(user: User): Observable<any> {
    let newpath = this.path + "/login";
    try {
      return this.http.post(newpath, user).pipe(
        tap(data => {
          if (data.success === true) {
            localStorage.setItem("loggedUser", JSON.stringify(data.loggedInUser));
            localStorage.setItem("token", data.expiresIn);
            console.log(data.expiresIn);
            setTimeout(() => {
              this.logout().subscribe();
            }, Number(data.expiresIn) * 1000);
          }
          console.log("data:", data, " user:", this.loggedinuser);
        })
      );
    } catch (err) {
      let error = err;
      return throwError(error);
    }
  }

  loggedinuservalue():boolean{
    if (!localStorage.getItem("loggedUser")) {
      return this.loggedinuser = false;
    }else{
      return this.loggedinuser = true;
    }
  }
editPhoto(userId: string, formData: FormData): Observable<any> {
  const newpath = `${this.path}/profilimg_upload/${userId}`;

  return this.http.put(newpath, formData).pipe(
    catchError((err) => {
      console.log("Error:", err);
      return throwError(err);
    })
  );
}


logout(): Observable<any> {
    let newpath = this.path + "/logout";
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("token");
    this.loggedinuser = false;
    return this.http.get(newpath).pipe(tap(data=>{
        console.log(JSON.stringify(data));
        return data;
    }));
}
  sendmail(hmodel:HelpRequest): Observable<any> {
    let newpath = this.path + "/sendmail";
    try {
      return this.http.post(newpath,hmodel).pipe(tap(data=>{
        console.log(JSON.stringify(data));
      }));
    } catch (err) {
      let error= err;
      return error;
    }
  }
}
