import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ConnectionService } from '../../services/connection.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public title = 'Login';
  users: User[] = null;
  user: User = null;
  public email = '';
  public connected = false;
  host: 'host_ip_address';
  constructor(private router: Router,
    private service: UserService,
    private connect: ConnectionService) { }

  ngOnInit() {
    if (localStorage.getItem(this.host)) {
      this.connected = true;
      console.log('Connected');
    }
  }

  onLogin(): void {
    this.user = this.service.find(this.email);
    if (this.user) {
      //this.service.save(this.user);
      localStorage.removeItem('user_id');
      localStorage.setItem('user_id', this.user.id.toString());
      this.router.navigateByUrl('/home');
    }
  }

  onConnection(): void {
    this.router.navigateByUrl('/connection');
  }

}
