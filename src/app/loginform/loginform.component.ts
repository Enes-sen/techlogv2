import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { User } from '../registerform/user';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent {
  model:User = new User();
  title="Giriş Yap"
  constructor(private authServ:AuthService,private alertServ:AlertifyService,private router:Router){}


  login(form:NgForm){
    return this.authServ.login(this.model).subscribe(result=>{
      if(result.success===false){
        this.alertServ.danger(result.message);

      }else{
        this.alertServ.success("Giriş başarılı");
        this.router.navigate(['/dashboard']);
      }
    });
  }
  loggedIn(){
    return this.authServ.loggedinuser;
  }
}
