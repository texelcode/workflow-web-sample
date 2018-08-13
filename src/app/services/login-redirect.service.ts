import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginRedirectService implements CanActivate {

  constructor(private router: Router) {}
  canActivate(): boolean {
    if (localStorage.getItem('user_id')) {
      this.router.navigateByUrl('/home');
      return false;
    } else {
      return true;
    }
  }
}
