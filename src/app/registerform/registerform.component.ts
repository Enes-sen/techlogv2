import { Component} from '@angular/core';
import { User } from './user';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css'],
  providers:[AuthService]
})
export class RegisterformComponent{

  constructor(private authServ:AuthService, private alertServ:AlertifyService,private router:Router){}
  model:User  = new User();
  title="Kayıt Ol"

  register(form: NgForm) {
    this.authServ.register(this.model).subscribe((result) => {
      console.log(result);
      if(result.success===false){
        this.alertServ.danger(result.message);
      }else{
        this.alertServ.success("Kullanıcı:"+ result.newUser.name+", Başarıyla Eklendi.");
        this.router.navigate(['/login']);
      }

    });
  }
  loggedIn(){
    return this.authServ.loggedinuser;
  }


}

