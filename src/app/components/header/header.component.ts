import { Component, OnInit, HostBinding, EventEmitter, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @HostBinding('class.is-open')
  isOpen = false;
  isLogedIn = false;
  message: any;
  title = '';
  attachOutsideOnClick = false;
  enabled = true;

  constructor(
    public router: Router,
    private service: UserService,
    private events: EventService) { }

  ngOnInit() {
    this.events.userLogin.subscribe(logedIn => {
      this.isLogedIn = logedIn;
    });
  }

  onLogout(): void {
    this.service.remove();
    this.events.logedIn(false);
    this.router.navigateByUrl('/login');
  }
  onHome(): void {
    this.router.navigateByUrl('/home');
  }

  toggle(event: any) {
    this.events.sidebarToggle();
    event.stopPropagation();
  }

}
