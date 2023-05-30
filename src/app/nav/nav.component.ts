import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  title = 'TechLog';

  constructor(
    private authServ: AuthService,
    private alertServ: AlertifyService
  ) {}

  logout() {
    return this.authServ.logout().subscribe((result) => {
      if (result.success === false) {
        this.alertServ.danger(result.message);
      } else {
        this.alertServ.success('çıkış işlemi başarılı');
        localStorage.clear();
      }
    });
  }

  loggedIn(): boolean {
    console.log('answers:', this.authServ.loggedinuservalue());
    return this.authServ.loggedinuservalue();
  }
}
