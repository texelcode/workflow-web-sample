import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { UserService } from '../../services/user.service';
import { ConnectionService } from '../../services/connection.service';
import { EventService } from '../../services/event.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Login';
  users: User[] = [];
  user: User;
  email = '';
  connected = false;
  host = 'host_ip_address';
  private readonly notifier: NotifierService;
  constructor(private router: Router,
    private service: UserService,
    private connect: ConnectionService,
    private notifs: NotifierService,
    private events: EventService) {
      this.notifier = notifs;
    }

  ngOnInit() {
    if (localStorage.getItem(this.host)) {
      this.connected = true;
      console.log('Connected');
    }
  }

  onLogin() {
    if (this.email !== '') {
      // this.user = this.service.find(this.email);
      this.service.load().subscribe(
        (res) => {
          this.users = JSON.parse(JSON.stringify(res.data));
          this.user = this.users.find(x => x.email === this.email.toLowerCase());
          if (this.user) {
            this.authorized(true);
          } else {
            this.authorized(false);
          }
        },
        (err) => {
          this.errAuthorization(err);
        }
      );

    } else {
      this.mandatory('Email');
    }

  }

  authorized(auth: boolean) {
    this.events.logedIn(auth);
    if (auth) {
      localStorage.setItem('user_id', this.user.id.toString());
      console.log('User Authorized');
      this.router.navigateByUrl('/home');
    } else {
      this.notifier.notify( 'error', 'User not Authorized!' );
      console.log('User not Authorized');
    }

  }

  errAuthorization(err: any) {
    this.events.logedIn(false);
    this.notifier.notify( 'error', 'Check your connection!' );
    console.log(err);
  }

  mandatory(field: any) {
    this.events.logedIn(false);
    this.notifier.notify( 'error', field + ' field can not be empty!' );
    console.log(field + ' field can not be empty!');
  }

  onConnection() {
    this.router.navigateByUrl('/connection');
  }

}
