import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';

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
    private sideBarService: SidebarService) { }

  ngOnInit() {
    this.sideBarService.change.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  toggle() {
    if (this.isOpen) {
      this.sideBarService.toggle();
    }
  }

  onLogout(): void {
    this.service.remove();
    this.router.navigateByUrl('/login');
  }

  onClickedOutside(e: Event) {
    if (this.isOpen) {
      this.sideBarService.toggle();
    }
  }

}
