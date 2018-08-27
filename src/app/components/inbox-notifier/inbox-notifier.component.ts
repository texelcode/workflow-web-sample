import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Inbox } from '../../models/inbox';
import { InboxService } from '../../services/inbox.service';
import { InboxStatus } from '../../models/inbox-status.enum';

@Component({
  selector: 'app-inbox-notifier',
  templateUrl: './inbox-notifier.component.html',
  styleUrls: ['./inbox-notifier.component.css']
})
export class InboxNotifierComponent implements OnInit {

  inboxs: Inbox[] = [];
  waits: Inbox[] = [];
  private readonly notifier: NotifierService;

  constructor(
    private inbox: InboxService,
    private notif: NotifierService) {
    this.notifier = notif;
  }

  ngOnInit() {
    this.loadInboxs();
  }

  loadInboxs() {
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

}
