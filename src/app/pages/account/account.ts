import { AuthService } from './../../auth/auth.service';
import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
})
export class AccountPage implements AfterViewInit {
  user: any;

  constructor(
    public alertCtrl: AlertController,
    public router: Router,
    private authService: AuthService
  ) { }

  ngAfterViewInit() {
    this.authService.getUser().subscribe((user) => this.user = user);
  }

  logout() {
    this.authService.logout();
  }

}
