import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @HostBinding('class.is-open')
  isOpen = false;
  attachOutsideOnClick = false;
  enabled = true;
  constructor(
    public router: Router,
    private service: UserService,
    private events: EventService) { }

  ngOnInit() {
    this.events.sidebarChange.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  toggle() {
    if (this.isOpen) {
      this.events.sidebarToggle();
    }
  }

  onLogout(): void {
    this.service.remove();
    if (this.isOpen) {
      this.events.sidebarToggle();
    }
    this.events.logedIn(false);
    this.router.navigateByUrl('/login');
  }

  onClickedOutside(e: Event) {
    if (this.isOpen) {
      this.events.sidebarToggle();
    }
  }

}
