import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { HelperService } from '../../services/helper/helper.service';
import { Events } from '@ionic/angular';
import { AngularFireObject, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  currentUser;
  isAdmin: boolean;
  auth: any;
  profile: AngularFireObject<any>;

  constructor(
    public userService: UserService,
    private helperService: HelperService,
    private events: Events,
    public afAuth: AngularFireAuth,
    private router: Router,

  ) {
    this.auth = this.userService.getCurrentUser();
    this.getProfile();
   }
    user: object = {
    name: 'User One',
    email: 'user@host.com',
    fileNo: '435577687',
    doctorName: 'Dr. Ghaida'
  };

  ngOnInit() {
    this.afAuth.authState.subscribe((fbauth) => {
      if (fbauth) {
        this.auth = fbauth;
        if (!fbauth) { return; }

        this.getProfile();
      }
    });
  }

  async getProfile() {
    const result: any = await this.userService.fbLoadMyProfie();
    if (result.success) { this.profile = result.data; }
    this.isAdmin = this.userService.isAdminUser();
  }

  logout() {
    this.userService.logout();
    this.helperService.showSuccessMsg('LOGIN.SUCCESS_LOGOUT');
  }
}
