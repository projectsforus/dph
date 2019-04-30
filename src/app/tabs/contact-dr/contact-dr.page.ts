import { Component, OnInit } from '@angular/core';
import { Device } from '@ionic-native/device/ngx';
import { Platform } from '@ionic/angular';
import { UserService } from '../../services/user/user.service';
import { HelperService } from './../../services/helper/helper.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact-dr',
  templateUrl: './contact-dr.page.html',
  styleUrls: ['./contact-dr.page.scss'],
})
export class ContactDrPage implements OnInit {
  phone_model = 'iPhone';
  input = '';
  conversation: Observable<any[]>;

  constructor(private platform: Platform,
    private device: Device, public afAuth: AngularFireAuth,
    private userService: UserService,
    private helperService: HelperService) {
      this.afAuth.authState.subscribe((fbauth) => {
        if (fbauth) {
          this.getChats();
        }
      });
     }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.scrollToBottom();
    setTimeout(() => {
      this.presentAlert();
    }, 500);
  }

  send() {
    if (this.input !== '') {
      this.userService.sendMsgToDr(this.input);
      this.input = '';
    }
  }

  async getChats() {
    const result: any = await this.userService.loadMyChats();
    if (result.success) {
      this.conversation = result.data;
      this.conversation.subscribe(res => {
        this.helperService.playSound(res[res.length - 1].sender);
        this.scrollToBottom();
      });
    }
  }

   presentAlert() {
    if (this.device.platform = 'iOS') {
      switch (this.platform.height()) {
        case 812:
          this.phone_model = 'iPhone X';
          break;
        case 736:
          this.phone_model = 'iPhone 6/7/8 Plus';
          break;
        case 667:
          this.phone_model = 'iPhone 6/7/8';
          break;
      }
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      const content = document.getElementById('chat-container');
      const parent = document.getElementById('chat-parent');
      const scrollOptions = {
        left: 0,
        top: content.offsetHeight
      };

      parent.scrollTo(scrollOptions);
    }, 50);

  }

  dateStr(date) {
    return (new Date(date)).toLocaleString();
  }
}
