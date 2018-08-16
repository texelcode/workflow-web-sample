import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { InboxService } from '../../services/inbox.service';
import { Inbox } from '../../models/inbox';
import { InboxStatus } from '../../models/inbox-status.enum';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  inboxs: Inbox[] = [];
  waits: Inbox[] = [];
  user: User;
  users: User[] = [];
  rows: Array<any> = [];
  loadingIndicator = true;
  reorderable = true;
  selected: User[] = [];
  columns = [
    { name: 'ID', width: 50, minWidth: 50, maxWidth: 50, canAutoResize: false},
    { name: 'Name', width: 400, minWidth: 100, maxWidth: 500, canAutoResize: true},
    { name: 'Email', width: 1000, minWidth: 600, maxWidth: 1200, canAutoResize: true}
  ];

  // iconsCss = {
  //   sortAscending: 'fa fa-angle-down',
  //   sortDescending: 'fa fa-angle-up',
  //   pagerLeftArrow: 'fa fa-angle-double-left',
  //   pagerRightArrow: 'fa fa-angle-double-right',
  //   pagerPrevious: 'fa fa-angle-left',
  //   pagerNext: 'fa fa-angle-right' };
  private readonly notifier: NotifierService;
  constructor(
    public router: Router,
    private service: UserService,
    private inbox: InboxService,
    notifierService: NotifierService) {
      this.notifier = notifierService;
    }

  ngOnInit() {
    this.service.load().subscribe(
      (res) => {
        this.users = JSON.parse(JSON.stringify(res.data));
        this.rows = this.users;
      },
      (err) => {
        this.notifier.notify( 'error', 'User loading error!' );
        console.log(err);
      }
    );
    this.inbox.loadInboxs().subscribe(
      (res) => {
        this.inboxs = JSON.parse(JSON.stringify(res.data));
        this.waits = this.inboxs.filter(x => x.status === InboxStatus.waiting);
        if (this.waits) {
          if (this.waits.length > 0) {
            this.notifier.notify( 'warning', 'You have waiting approval in your inbox!' );
          }
        }
      },
      (err) => {
        this.notifier.notify( 'error', 'Inbox loading error!' );
        console.log(err);
      }
    );
  }

  addItem() {
    this.router.navigateByUrl('/add-user');
  }

  // onSelect(usr: User) {
  //   this.router.navigate(['/user', usr.id]);
  // }

  public onCellClick(data: any): any {
    console.log(data);
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
    this.user = this.selected[0];
    console.log('Select User', this.user);
    this.router.navigate(['/user', this.user.id]);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

}
