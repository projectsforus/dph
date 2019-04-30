import { Component } from '@angular/core';

import { Platform, Events} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { HelperService } from './services/helper/helper.service';
import { UserService } from './services/user/user.service';
import { ConfigService } from './services/config/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  dir;
  currentUser;
  isDoctor: boolean;
  isAdmin: boolean;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private helperService: HelperService,
    private userService: UserService,
    private router: Router,
    private events: Events,
    configService: ConfigService
  ) {
    this.initializeApp();
    this.trackcurrentUser();
    configService.getConfig().then((config) => {
      this.translate.use(config['lang']);
      this.dir = config['dir'];
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.translate.setDefaultLang('en');
    });
  }

  trackcurrentUser() {
    this.events.subscribe('userUpdate', (user, isDoctor) => {
      this.currentUser = user;
      this.isDoctor = isDoctor;
      this.isAdmin = this.userService.isAdminUser();
      this.navigateCurrentUser();
    });
  }

  navigateCurrentUser() {
    if (this.currentUser && this.isAdmin) {
      return this.router.navigate(['tabs/doctors-list']);
    }

    if (this.currentUser && this.isDoctor) {
      return this.router.navigate(['tabs/my-patients']);
    }


    if (this.currentUser) {
      return this.router.navigate(['tabs/home']);
    }

    this.router.navigate(['']);
  }
}
