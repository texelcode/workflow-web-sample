import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import { Approval } from '../../models/approval';
import { Reason } from '../../models/reason';
import { ApprovalStatus } from '../../models/approval-status.enum';
import { ApprovalService } from '../../services/approval.service';
import { ApprovalRequest } from '../../models/approval-request';

@Component({
  selector: 'app-approval-add',
  templateUrl: './approval-add.component.html',
  styleUrls: ['./approval-add.component.css']
})
export class ApprovalAddComponent implements OnInit {
  reasons: Reason[] = [];
  request: ApprovalRequest;
  reason: Reason;
  reasonId: number;
  apprStatus = ApprovalStatus;
  note = '';
  now = new Date();
  leave_dates: number[] = [];

  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
    showTodayBtn: false
  };

  // Initialized to specific date (09.10.2018)
  model: any = { date: { year: 2018, month: 10, day: 9 } };
  private readonly notifier: NotifierService;
  constructor(
    public router: Router,
    private service: ApprovalService,
    notifierService: NotifierService) {
      this.notifier = notifierService;
    }

  ngOnInit() {
    this.loadReasons();
    this.model = { date: { year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate() } };

  }

  onDateChanged(event: IMyDateModel): void {
    if (this.leave_dates.indexOf(event.epoc * 1000) === -1) {
      this.leave_dates.push(event.epoc * 1000);
    }
  }

  loadReasons() {
    this.service.loadReasons().subscribe(
      (res) => {
        this.reasons = JSON.parse(JSON.stringify(res.data));
        console.log(this.reasons);
      },
      (err) => {
        this.notifier.notify( 'error', 'Reason loading error!' );
        console.log(err);
      }
    );
  }

  itemSelected(rea: Reason) {
    this.reason = rea;
    console.log(rea);
  }

  onSubmit(): void {
    this.request = new ApprovalRequest;
    this.request.reason_id = this.reasonId;
    this.request.note = this.note;
    this.request.request_id = 1;
    this.request.user_id = +localStorage.getItem('user_id');
    this.request.leave_dates = this.leave_dates;
    console.log(this.request);
    this.service.submitRequest(this.request).subscribe(
      (res) => {
        console.log(res.data);
      },
      (err) => {
        this.notifier.notify( 'error', 'Submit request error!' );
        console.log(err);
      }
    );
    this.router.navigateByUrl('/approval');
  }

  onCancel() {
    this.router.navigateByUrl('/approval');
  }

}
