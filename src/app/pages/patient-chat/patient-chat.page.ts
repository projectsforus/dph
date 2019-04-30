import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { HelperService } from '../../services/helper/helper.service';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Device } from '@ionic-native/device/ngx';

@Component({
  selector: 'app-patient-chat',
  templateUrl: './patient-chat.page.html',
  styleUrls: ['./patient-chat.page.scss'],
})
export class PatientChatPage implements OnInit {
  uid: string;
  phone_model = 'iPhone';
  input = '';
  conversation: any[];
  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private helperService: HelperService,
    private platform: Platform,
    private device: Device, public afAuth: AngularFireAuth) {
    this.uid = this.route.snapshot.paramMap.get('uid');
      this.afAuth.authState.subscribe((fbauth) => {
        if (fbauth) {
          this.getPatientChat();
        }
      });
     }

  ngOnInit() {
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.scrollToBottom();
      this.presentAlert();
    }, 100);
  }

  send() {
    if (this.input !== '') {
      this.userService.sendMsgToPatient(this.input, this.uid);
      this.input = '';
      setTimeout(() => {
        this.scrollToBottom();
      }, 10);
    }
  }

  async getPatientChat() {
    const result: any = await this.userService.loadPatientChat(this.uid);
    if (result.success) {
      this.conversation = result.data;
      setTimeout(() => {
        this.scrollToBottom();
      }, 700);
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
    const content = document.getElementById('chat-container');
    const parent = document.getElementById('chat-parent');
    const scrollOptions = {
      left: 0,
      top: content.offsetHeight
    };

    parent.scrollTo(scrollOptions);
  }

  dateStr(date) {
    return (new Date(date)).toLocaleString();
  }

}
