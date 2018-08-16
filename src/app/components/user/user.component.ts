import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { InboxService } from '../../services/inbox.service';
import { Inbox } from '../../models/inbox';
import { InboxStatus } from '../../models/inbox-status.enum';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  inboxs: Inbox[] = [];
  waits: Inbox[] = [];
  user: User;
  users: User[] = [];
  id: number;
  name: string;
  email: string;
  private sub: any;
  private readonly notifier: NotifierService;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private service: UserService,
    private inbox: InboxService,
    notifierService: NotifierService) {
      this.notifier = notifierService;
    }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getUser(this.id);
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getUser(userId: number) {
    this.service.load().subscribe(
      (res) => {
        this.users = JSON.parse(JSON.stringify(res.data));
        this.user = this.users.find(x => x.id === userId);
        // for (const use of this.users) {
        //   if (userId === use.id) {
        //     this.user = use;
        //     break;
        //   }
        // }
      },
      (err) => {
        this.notifier.notify( 'error', 'User loading error!' );
        console.log(err);
      }
    );
  }

  onBack() {
    this.router.navigateByUrl('/user');
  }

}
