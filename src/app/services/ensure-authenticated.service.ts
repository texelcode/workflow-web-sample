import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})

export class EnsureAuthenticatedService implements CanActivate {

  isLogedIn = false;
  constructor(
    private router: Router,
    private events: EventService) { }

  canActivate(): boolean {
    this.events.userLogin.subscribe(logedIn => {
      this.isLogedIn = logedIn;
    });
    if (this.isLogedIn) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
