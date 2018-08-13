import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class EnsureAuthenticatedService implements CanActivate {

  constructor(private user: UserService, private router: Router) { }

  canActivate(): boolean {
    if (localStorage.getItem('user_id')) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
