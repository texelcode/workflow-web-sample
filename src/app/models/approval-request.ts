import { Request } from './request';
export class ApprovalRequest extends Request {
  public note: string;
  public leave_dates: number[] = [];
  public reason_id: number;
}
