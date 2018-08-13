import { Base } from './base';
import { Recipient } from './recipient';
import { Reason } from './reason';
import { ApprovalStatus } from './approval-status.enum';
import { ApprovalDetail } from './approval-detail';
export class Approval extends Base {
  public status: ApprovalStatus;
  public created: Number;
  public note: String;
  public reason: Reason;
  public recipients: Recipient[];
  public user_id: number;
  public wf_instance_name: string;
  public leave_days: number;
  public reason_id: number;
  public definition_step_name: string;
  public submittedDate: string;
  public details: ApprovalDetail[];
}
