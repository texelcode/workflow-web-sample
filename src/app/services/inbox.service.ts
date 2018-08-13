import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { Metadata } from '../models/metadata';
import { ErrorHandlerService } from './error-handler.service';
import { Inbox } from '../models/inbox';
import { InboxApproval } from '../models/inbox-approval';

@Injectable({
  providedIn: 'root'
})
export class InboxService {
  address =  localStorage.getItem('host_ip_address') + '/user_leave_inbox';
  headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(
    private client: HttpClient,
    private error: ErrorHandlerService) { }

  loadInboxs(): Observable<Metadata> {
    const userId = localStorage.getItem('user_id');
    const url =  this.address + '?user_id=' + userId;
    return this.client.get<Metadata>(url, {headers: this.headers})
    .pipe(
      catchError((error) => this.error.log(error))
    );
  }

  getInbox(id: number): Observable<Metadata> {
    const url =  this.address + '/' + id;
    return this.client.get<Metadata>(url, {headers: this.headers})
    .pipe (
      catchError((error) => this.error.log(error))
    );
  }

  setApproval(approve: InboxApproval): Observable<Metadata> {
    const url =  localStorage.getItem('host_ip_address') + '/user_approve_reject';
    return this.client.post<Metadata>(url, JSON.stringify(approve), {headers: this.headers, observe: 'response'})
    .pipe(
      catchError((error) => this.error.log(error))
    );
  }


}
