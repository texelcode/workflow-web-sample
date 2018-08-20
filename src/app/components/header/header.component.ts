import { Component, OnInit, HostBinding, EventEmitter, HostListener } from '@angular/core';
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
  @HostBinding('class.is-open')
  isOpen = false;
  message: any;
  title = '';
  attachOutsideOnClick = false;
  enabled = true;

  constructor(
    public router: Router,
    public pesan: MessageService,
    private service: UserService,
    private sideBarService: SidebarService) { }

  ngOnInit() {
    this.sideBarService.change.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  onLogout(): void {
    this.service.remove();
    this.router.navigateByUrl('/login');
  }
  onHome(): void {
    this.router.navigateByUrl('/home');
  }

  toggle(event: any) {
    this.sideBarService.toggle();
    event.stopPropagation();
  }

}
