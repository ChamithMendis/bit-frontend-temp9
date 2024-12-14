// angular import
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get formControl() {
    return this.registerForm?.controls;
  }

  onSubmitRegister() {
    this.submitted = true;
    if (this.registerForm?.valid) {
      this.authenticationService
        .request('POST', '/register', {
          firstName: this.registerForm.value.firstName,
          lastName: this.registerForm.value.lastName,
          login: this.registerForm.value.login,
          password: this.registerForm.value.password
        })
        .then((response: any) => {
          this.authenticationService.setAuthToken(response.token);
          this.router.navigate(['/guest/login']);
        });
    }
  }
}
