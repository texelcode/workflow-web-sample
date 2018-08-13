import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
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

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private host: 'host_ip_address';
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private client: HttpClient, private error: ErrorHandlerService) { }

  saveIPAddress(ipaddress: string) {
    localStorage.setItem(this.host, ipaddress);
  }

  getIPAddress(): string {
    return localStorage.getItem(this.host);
  }

  test(ipaddress: string): Observable<HttpResponse<String>> {
    localStorage.setItem('host_ip_address', 'http://' + ipaddress);
    const url = localStorage.getItem('host_ip_address') + '/date_time';
    return this.client.get<String>(url, {headers: this.headers, observe: 'response'})
    .pipe(
      catchError((error) => this.error.log(error))
    );
  }

}
