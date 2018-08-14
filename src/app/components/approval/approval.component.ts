import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApprovalService } from '../../services/approval.service';
import { Approval } from '../../models/approval';
import { ApprovalStatus } from '../../models/approval-status.enum';
import { Recipient } from '../../models/recipient';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit, OnDestroy {
  min: number;
  max: number;
  request: Approval;
  id: number;
  private sub: any;
  approvalStatus = ApprovalStatus;
  leave_dates: number[] = [];
  recipients: Object;
  isCollapsed = true;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public service: ApprovalService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getRequest(this.id);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getRequest(id: number) {
    this.service.getRequest(id).subscribe(
      (res) => {
        this.request = JSON.parse(JSON.stringify(res.data));
        for (const detail of this.request.details) {
          this.leave_dates.push(detail.leave_date);
        }
        this.recipients = this.request.recipients;

        this.max = Math.max(...this.leave_dates);
        this.min = Math.min(...this.leave_dates);

        this.leave_dates.sort((n1, n2) => n1 - n2);
        console.log(this.request);
      },
      (err) => console.log(err)
    );
  }

  onBack() {
    this.router.navigateByUrl('/approval');
  }

  onCancel() {
    this.router.navigateByUrl('/approval');
  }

}
