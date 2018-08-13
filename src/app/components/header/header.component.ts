import { Component, OnInit, OnDestroy, ViewChild, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  message: any;
  title = '';
  constructor(
    public router: Router,
    public pesan: MessageService,
    private service: UserService) { }

  ngOnInit() {

  }

  onLogout(): void {
    this.service.remove();
    this.router.navigateByUrl('/login');
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

  goInbox() {
    this.router.navigateByUrl('/inbox');
  }

  goRequest() {
    //this.router.navigateByUrl('/approval');
    //this.pesan.sendMessage('Request List');
    this.title = 'Request List';
  }

  goUser() {
    //this.router.navigateByUrl('/user');
    //this.pesan.sendMessage(this.title);
  }

}
