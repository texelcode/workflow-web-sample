import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  message: any;
  title = '';


  constructor(
    public router: Router,
    public pesan: MessageService,
    private service: UserService,
    private sideBarService: SidebarService) { }

  ngOnInit() {

  }

  onLogout(): void {
    this.service.remove();
    this.router.navigateByUrl('/login');
  }

  toggle() {
    this.sideBarService.toggle();
  }

}
