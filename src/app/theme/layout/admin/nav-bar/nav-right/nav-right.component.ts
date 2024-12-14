// Angular import
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CacheService } from 'src/app/services/CacheService';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private cacheService: CacheService
  ) {}

  public logOutUser(): void {
    this.cacheService.clear(this.authenticationService.getUserId()!);
    this.authenticationService.removeToken();
    this.router.navigate(['/guest/login']);
  }
}
