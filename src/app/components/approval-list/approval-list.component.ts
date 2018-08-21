import { Component, OnInit, OnDestroy, Output, EventEmitter, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { ApprovalService } from '../../services/approval.service';
import { Approval } from '../../models/approval';
import { Reason } from '../../models/reason';
import { ApprovalStatus } from '../../models/approval-status.enum';
import { InboxService } from '../../services/inbox.service';
import { Inbox } from '../../models/inbox';
import { InboxStatus } from '../../models/inbox-status.enum';

@Component({
  selector: 'app-approval-list',
  templateUrl: './approval-list.component.html',
  styleUrls: ['./approval-list.component.css']
})
export class ApprovalListComponent implements OnInit {
  title: 'Approval List';
  inboxs: Inbox[] = [];
  waits: Inbox[] = [];
  requests: Approval[] = [];
  selected: Approval[] = [];
  reorderable = true;
  rows: Array<any> = [];
  reasons: Reason[] = [];
  request: Approval;
  reason: Reason;
  selectedReason: Reason;
  apprStatus = ApprovalStatus;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  columns = [
    { name: 'Reason', prop: 'reason.name', width: 200, minWidth: 150, maxWidth: 300, canAutoResize: true},
    { name: 'Status', prop: 'apprStatus[status]', width: 1000, minWidth: 600, maxWidth: 1200, canAutoResize: true}
  ];
  private readonly notifier: NotifierService;
  constructor(
    public router: Router,
    private service: ApprovalService,
    private inbox: InboxService,
    notifierService: NotifierService) {
      this.notifier = notifierService;
    }

  ngOnInit() {
    this.loadRequests();
    this.maxDate.setDate(this.maxDate.getDate());
    this.bsRangeValue = [this.bsValue, this.maxDate];

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

  loadRequests() {
    this.service.loadRequests().subscribe(
      (res) => {
        this.requests = JSON.parse(JSON.stringify(res.data));
        this.rows = this.requests;
      },
      (err) => {
        this.notifier.notify( 'error', 'Request loading error!' );
        console.log(err);
      }
    );
  }

  itemSelected(rea: Reason) {
    console.log(rea);
  }

  addItem() {
    this.router.navigateByUrl('/add-approval');
  }

  // onSelect(appr: Approval) {
  //   this.router.navigate(['/approval', appr.id]);
  // }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
    this.request = this.selected[0];
    console.log('Select Approval', this.request);
    this.router.navigate(['/approval', this.request.id]);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

}
