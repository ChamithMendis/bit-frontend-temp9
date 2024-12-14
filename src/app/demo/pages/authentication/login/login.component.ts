import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CacheService } from 'src/app/services/CacheService';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  userNamePasswordError = false;

  data!: any[];
  private cacheSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private cacheService: CacheService,
    private _messageService: MessageServiceService
  ) {
    this.loginForm = this.formBuilder.group({
      loginName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.clearCacheIfNotAuthorize();

    this.cacheSubscription = this.cacheService.cache$.subscribe((data) => {
      this.data = data;
    });
  }

  public clearCacheIfNotAuthorize(): void {
    const isTokenExpired = this.authenticationService.isTokenExpired();
    if (isTokenExpired) {
      console.log('expired');
      this.authenticationService.clearCache();
    }
  }

  getData(userId: number): void {
    const cachedData = this.cacheService.get(userId.toString());

    // If the data is not in cache, we retrieve it from the server and store it in the cache.
    if (!cachedData) {
      this.authenticationService
        .getAuthIds(userId)
        .then((data: any) => {
          try {
            if (data.length > 0) {
              this.cacheService.set(userId.toString(), data);
              this.router.navigate(['/default']);
            } else {
              this._messageService.showError('User does not have privileges');
            }
          } catch (error) {
            this._messageService.showError('Action Failed');
          }
        })
        .catch((error) => {
          this._messageService.showError('Action Failed');
        });
    }
  }

  get formControl() {
    return this.loginForm?.controls;
  }

  onSubmitLogin(): void {
    this.submitted = true;
    if (this.loginForm?.valid) {
      this.authenticationService
        .request('POST', '/login', {
          login: this.loginForm.value.loginName,
          password: this.loginForm.value.password
        })
        .then((response) => {
          this.authenticationService.setAuthToken(response.token);
          this.authenticationService.setUserId(response.id);
          this.authenticationService.setLoginNameToCache(response.login);
          this.getData(response.id);
        })
        .catch((error) => {
          this.userNamePasswordError = true;
        });
    }
  }
}
