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
import { ApprovalRequest } from '../models/approval-request';

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {
  headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private client: HttpClient, private error: ErrorHandlerService) { }

  loadReasons(): Observable<Metadata> {
    const url =  localStorage.getItem('host_ip_address') + '/user_leave_reason';
    return this.client.get<Metadata>(url, {headers: this.headers})
    .pipe (
      catchError((error) => this.error.log(error))
    );
  }

  loadRequests(): Observable<Metadata> {
    const userId = localStorage.getItem('user_id');
    const url =  localStorage.getItem('host_ip_address') + '/user_leave_header?user_id=' + userId;
    return this.client.get<Metadata>(url, {headers: this.headers})
    .pipe (
      catchError((error) => this.error.log(error))
    );
  }

  getRequest(id: number): Observable<Metadata> {
    const url =  localStorage.getItem('host_ip_address') + '/user_leave_header/' + id;
    return this.client.get<Metadata>(url, {headers: this.headers})
    .pipe (
      catchError((error) => this.error.log(error))
    );
  }

  submitRequest(request: ApprovalRequest): Observable<Metadata> {
    const url =  localStorage.getItem('host_ip_address') + '/user_leave_header';
    return this.client.post<Metadata>(url, JSON.stringify(request), {headers: this.headers})
    .pipe (
      catchError((error) => this.error.log(error))
    );
  }
}
