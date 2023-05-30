import { Component, OnInit } from '@angular/core';
import { User } from '../registerform/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-section',
  templateUrl: './user-section.component.html',
  styleUrls: ['./user-section.component.css'],
})
export class UserSectionComponent implements OnInit {
  user: User;
  serverURL = 'https://techlog-backend.onrender.com/api/users'; // Backend sunucu adresi

  constructor(private authServ: AuthService) {}

  ngOnInit(): void {
    const data = localStorage.getItem('loggedUser');
    this.user = JSON.parse(data);
    console.log(this.user);
  }

  getUserName(): string {
    return this.user?.name || 'Unknown'; // Use optional chaining (?.) and provide a default value
  }
}
