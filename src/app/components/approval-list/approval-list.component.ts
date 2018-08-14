import { Component, OnInit, OnDestroy, Output, EventEmitter, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { ApprovalService } from '../../services/approval.service';
import { MessageService } from '../../services/message.service';
import { Approval } from '../../models/approval';
import { Reason } from '../../models/reason';
import { ApprovalStatus } from '../../models/approval-status.enum';


@Component({
  selector: 'app-approval-list',
  templateUrl: './approval-list.component.html',
  styleUrls: ['./approval-list.component.css']
})
export class ApprovalListComponent implements OnInit, OnDestroy {
  title: 'Approval List';
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
  message: any;
  subscription: Subscription;
  columns = [
    { name: 'Reason', prop: 'reason.name', width: 200, minWidth: 150, maxWidth: 300, canAutoResize: true},
    { name: 'Status', prop: 'apprStatus[status]', width: 1000, minWidth: 600, maxWidth: 1200, canAutoResize: true}
  ];
  constructor(
    public router: Router,
    public pesan: MessageService,
    private service: ApprovalService) { }

  ngOnInit() {
    this.loadRequests();
    this.maxDate.setDate(this.maxDate.getDate());
    this.bsRangeValue = [this.bsValue, this.maxDate];
    this.subscription = this.pesan.getMessage()
    .subscribe(message => {
      this.message = message;
      console.log(message);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadRequests() {
    this.service.loadRequests().subscribe(
      (res) => {
        this.requests = JSON.parse(JSON.stringify(res.data));
        this.rows = this.requests;
        console.log(this.requests);
      },
      (err) => console.log(err)
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
