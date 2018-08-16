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
    this.sideBarService.toggle();
  }

  onLogout(): void {
    this.service.remove();
    this.toggle();
    this.router.navigateByUrl('/login');
  }

}