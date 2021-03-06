import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
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
export class ApprovalListComponent implements OnInit, AfterViewInit {
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
  columns = [
    { name: 'Reason', prop: 'reason.name', width: 200, minWidth: 150, maxWidth: 300, canAutoResize: true},
    { name: 'Status', prop: 'apprStatus[status]', width: 1000, minWidth: 600, maxWidth: 1200, canAutoResize: true}
  ];
  private readonly notifier: NotifierService;

  constructor(
    private changeDetector: ChangeDetectorRef,
    public router: Router,
    private service: ApprovalService,
    private inbox: InboxService,
    notifierService: NotifierService,
    private loading: SlimLoadingBarService) {
      this.notifier = notifierService;
  }

  ngOnInit() {
    this.loading.start();
    this.loadRequests();
  }

  ngAfterViewInit() {
    this.changeDetector.detectChanges();
    this.loading.complete();
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
