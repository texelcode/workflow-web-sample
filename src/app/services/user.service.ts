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

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userid = 'user_id';
  private response: Metadata;
  private user: User = null;
  private users: User[] = null;
  private host = 'host_ip_address';
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private client: HttpClient, private error: ErrorHandlerService) { }

  load(): Observable<Metadata> {
    const address = localStorage.getItem(this.host);
    const url =  address + '/user';
    return this.client.get<Metadata>(url, {headers: this.headers})
    .pipe(
      catchError((error) => this.error.log(error))
    );
  }

  find(email: String): User {
    this.load().subscribe(
      (res) => {
        this.users = JSON.parse(JSON.stringify(res.data));
        this.user = this.users.find(x => x.email === email);
        // for (const use of this.users) {
        //   if (use.email === email) {
        //     this.user = use;
        //     //console.log(this.user);
        //     break;
        //   }
        // }
      },
      (err) => console.log(err)
    );
    return this.user;
  }

  get(id: Number): User {
    this.load().subscribe(
      (res) => {
        this.users = JSON.parse(JSON.stringify(res.data));
        this.user = this.users.find(x => x.id === id);
        // for (const use of this.users) {
        //   if (id === use.id) {
        //     this.user = use;
        //     //console.log(this.user);
        //     break;
        //   }
        // }
      },
      (err) => console.log(err)
    );
    //console.log(this.user);
    return this.user;
  }

  save(use: User) {
    localStorage.setItem(this.userid, use.id.toString());
  }

  remove() {
    localStorage.removeItem(this.userid);
  }
}
