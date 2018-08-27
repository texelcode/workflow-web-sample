import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Inbox } from '../../models/inbox';
import { InboxService } from '../../services/inbox.service';
import { InboxStatus } from '../../models/inbox-status.enum';

@Component({
  selector: 'app-inbox-list',
  templateUrl: './inbox-list.component.html',
  styleUrls: ['./inbox-list.component.css']
})
export class InboxListComponent implements OnInit, AfterViewInit {
  inboxs: Inbox[] = [];
  rows: Array<any> = [];
  selected: Inbox[] = [];
  reorderable = true;
  inbox: Inbox;
  inboxStatus = InboxStatus;
  columns = [
    { name: 'Name', width: 400, minWidth: 100, maxWidth: 500, canAutoResize: true},
  ];
  private readonly notifier: NotifierService;
  constructor(
    private changeDetector: ChangeDetectorRef,
    public router: Router,
    private service: InboxService,
    notifierService: NotifierService,
    private loading: SlimLoadingBarService) {
      this.notifier = notifierService;
    }

  ngOnInit() {
    this.loading.start();
    this.loadInboxs();
  }

  ngAfterViewInit() {
    this.changeDetector.detectChanges();
    this.loading.complete();
  }

  loadInboxs() {
    this.service.loadInboxs().subscribe(
      (res) => {
        this.inboxs = JSON.parse(JSON.stringify(res.data));
        this.rows = this.inboxs;
      },
      (err) => {
        this.notifier.notify( 'error', 'Inbox loading error!' );
        console.log(err);
      }
    );
  }

  // onSelect(inb: Inbox) {
  //   this.router.navigate(['/inbox', inb.id]);
  // }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
    this.inbox = this.selected[0];
    console.log('Select Inbox', this.inbox);
    this.router.navigate(['/inbox', this.inbox.id]);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

}
