import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const authToken = this.authenticationService.getAuthToken();
    if (authToken) {
      return true;
    }
    this.router.navigate(['/guest/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
}
