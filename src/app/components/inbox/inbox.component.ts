import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Inbox } from '../../models/inbox';
import { InboxService } from '../../services/inbox.service';
import { InboxApproval } from '../../models/inbox-approval';
import { InboxStatus } from '../../models/inbox-status.enum';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit, OnDestroy {
  inbox: Inbox;
  id: number;
  min: number;
  max: number;
  leave_dates: number[] = [];
  inboxStatus = InboxStatus;
  approval: InboxApproval;
  approve = false;
  recipient_result_id: number;
  private sub: any;
  private readonly notifier: NotifierService;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private service: InboxService,
    notifierService: NotifierService) {
      this.notifier = notifierService;
    }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getInbox(this.id);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getInbox(id: number) {
    this.service.getInbox(id).subscribe(
      (res) => {
        this.inbox = JSON.parse(JSON.stringify(res.data));

        for (const detail of this.inbox.leave_header.details) {
          this.leave_dates.push(detail.leave_date);
        }

        this.max = Math.max(...this.leave_dates);
        this.min = Math.min(...this.leave_dates);
        console.log(this.inbox);
      },
      (err) => {
        this.notifier.notify( 'error', 'Inbox loading error!' );
        console.log(err);
      }
    );
  }

  setApproval(appr: boolean) {
    const userId = localStorage.getItem('user_id');
    for (const recipient of this.inbox.leave_header.recipients) {
      if (recipient.user.id === +userId) {
        this.approve = appr;
        this.recipient_result_id = recipient.id;
        break;
      }
    }
    this.approval = new InboxApproval();
    this.approval.approved = this.approve;
    this.approval.recipient_result_id = this.recipient_result_id;

    this.service.setApproval(this.approval)
    .subscribe((res) => {
         console.log('Approval Result : ' + JSON.stringify(res.data));
         // this.reasons = JSON.parse(JSON.stringify(res.data));
       },
       (err) => {
        this.notifier.notify( 'error', 'Set approval error!' );
        console.log(err);
      }
     );
     this.router.navigateByUrl('/inbox');
  }

  onCancel() {
    this.router.navigateByUrl('/inbox');
  }

}
