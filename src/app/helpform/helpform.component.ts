import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertifyService } from '../services/alertify.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { HelpRequest } from './helprequest';

@Component({
  selector: 'app-helpform',
  templateUrl: './helpform.component.html',
  styleUrls: ['./helpform.component.css'],
  providers:[AuthService]
})
export class HelpformComponent {
  Hmodel:HelpRequest  = new HelpRequest();
  title="Yardım Talep Formu"

  constructor(private authServ :AuthService,private alertServ:AlertifyService){}

  senMail(form:NgForm){
    this.authServ.sendmail(this.Hmodel).subscribe((result) => {
      if(result.success===false){
        this.alertServ.danger(result.message);
      }else{
        this.alertServ.success("Mesajınız tarafımıza iletildi");
      }
    });
  }
}
