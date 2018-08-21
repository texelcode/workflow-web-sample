import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRedirectService implements CanActivate {

  isLogedIn = false;
  constructor(
    private router: Router,
    private events: EventService) {}

    canActivate(): boolean {
    this.events.userLogin.subscribe(logedIn => {
      this.isLogedIn = logedIn;
    });
    if (this.isLogedIn) {
      this.router.navigateByUrl('/home');
      return false;
    } else {
      return true;
    }
  }
}
