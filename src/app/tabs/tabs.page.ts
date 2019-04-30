import { Component } from '@angular/core';

import { UserService } from '../services/user/user.service';
import { Events } from '@ionic/angular';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  currentUser;
  isDoctor: boolean;
  adminAccount: boolean;
  constructor(
    private userService: UserService,
    private events: Events
  ) {
    this.currentUser = this.userService.getCurrentUser();
    this.trackcurrentUser();
    this.isDoctor = this.userService.getDoctor();
    this.adminAccount = this.userService.isAdminUser();
  }

  trackcurrentUser() {
    this.events.subscribe('userUpdate', (user, isDoctor) => {
      this.currentUser = user;
      this.isDoctor = isDoctor;
      this.adminAccount = this.userService.isAdminUser();
    });
  }

  showDr() {
    return this.isDoctor && !this.adminAccount;
  }

  showPatient() {
    return !this.isDoctor && !this.adminAccount;
  }

}
