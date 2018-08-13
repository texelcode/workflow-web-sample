import { Base } from './base';
import { InboxStatus } from './inbox-status.enum';
import { User } from './user';
import { Approval } from './approval';
export class Inbox extends Base {
    public status: InboxStatus;
    public result: String;
    public requester_user: User;
    public leave_header: Approval;
    public date_submitted: Number;
    public submittedDate: String;
}
