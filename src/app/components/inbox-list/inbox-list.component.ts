import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Inbox } from '../../models/inbox';
import { InboxService } from '../../services/inbox.service';
import { InboxStatus } from '../../models/inbox-status.enum';

@Component({
  selector: 'app-inbox-list',
  templateUrl: './inbox-list.component.html',
  styleUrls: ['./inbox-list.component.css']
})
export class InboxListComponent implements OnInit {
  inboxs: Inbox[] = [];
  rows: Array<any> = [];
  selected: Inbox[] = [];
  reorderable = true;
  inbox: Inbox;
  inboxStatus = InboxStatus;
  columns = [
    { name: 'Name', width: 400, minWidth: 100, maxWidth: 500, canAutoResize: true},
  ];

  constructor(
    public router: Router,
    private service: InboxService) { }

  ngOnInit() {
    this.service.loadInboxs().subscribe(
      (res) => {
        this.inboxs = JSON.parse(JSON.stringify(res.data));
        this.rows = this.inboxs;
        console.log(res.data);
      },
      (err) => console.log(err)
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
