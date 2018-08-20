import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
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
  users: User[] = [];
  user: User;
  email = '';
  connected = false;
  host = 'host_ip_address';
  private readonly notifier: NotifierService;
  constructor(private router: Router,
    private service: UserService,
    private connect: ConnectionService,
    notifierService: NotifierService) {
      this.notifier = notifierService;
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
            // this.service.save(this.user);
            // localStorage.removeItem('user_id');
            localStorage.setItem('user_id', this.user.id.toString());
            this.router.navigateByUrl('/home');
          } else {
            this.notifier.notify( 'error', 'User not Authorized!' );
            console.log('User not Authorized');
          }
        },
        (err) => {
          this.notifier.notify( 'error', 'User load error!' );
          console.log(err);
        }
      );

    } else {
      this.notifier.notify( 'error', 'Email can not be empty!' );
    }

  }

  onConnection(): void {
    this.router.navigateByUrl('/connection');
  }

}
