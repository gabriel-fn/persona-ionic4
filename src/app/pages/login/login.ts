import { AuthService } from './../../auth/auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login = { email: '', password: '' };

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  onLogin(form: NgForm) {
    if (form.valid) {
      this.authService.login(form.value['email'], form.value['password']);
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
