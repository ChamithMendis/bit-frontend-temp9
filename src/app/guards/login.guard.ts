import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const loggedInStatus = this.authenticationService.isLoggedIn;
    if (loggedInStatus) {
      this.router.navigate(['/authentication/login'], {
        queryParams: { returnUrl: state.url }
      });
      return loggedInStatus;
    }
    return !loggedInStatus;
  }
}
