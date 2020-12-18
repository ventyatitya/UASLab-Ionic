import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userEmail: string;
  userId: string;

  constructor(
    private navCtrl: NavController,
    private authSrv: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authSrv.userDetails().subscribe(res => {
      console.log('res:', res);
      console.log('uid:', res.uid);
      if (res !== null) {
        this.userEmail = res.email;
      } else {
        this.router.navigateByUrl('/login');
      }
    }, err => {
      console.log(err);
    });
  }

  logout() {
    this.authSrv.logoutUser().then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    }).catch(error => {
      console.log(error);
    });
  }
}
