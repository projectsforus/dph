import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoadingController, ToastController,
   AlertController, Platform } from '@ionic/angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { ConfigService } from '../config/config.service';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { LocalNotifications, ELocalNotificationTriggerUnit} from '@ionic-native/local-notifications/ngx';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  loading: any;
  config: any = {};
  connectionState: string;
  sendSound: MediaObject;
  receiveSound: MediaObject;
  constructor(private translateService: TranslateService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private spinnerDialog: SpinnerDialog,
    private toast: Toast,
    private platform: Platform,
    private media: Media,
    private nativeAudio: NativeAudio,
    private localNotifications: LocalNotifications,
    configService: ConfigService
    ) {
    configService.getConfig().then((config) => {
      this.config = config;
    });
    this.nativeAudio.preloadSimple('send', 'assets/audio/send.mp3');
    this.nativeAudio.preloadSimple('receive', 'assets/audio/receive.mp3');
    }

  async showSuccessMsg(message) {
    await this.showToast(this.translate(message));
  }

  async showToast(message: string, position: 'bottom' | 'middle' | 'top' = 'bottom' ) {

    await this.removeLoading();
    if (this.isNativePlatform()) {
      return await this.showNativeToast(message, position);
    }
    const toast = await this.toastController.create({
      message: message,
      position: position,
      duration: 5000,
      showCloseButton: true,
      closeButtonText: this.translate('CANCEL'),
      translucent: true,
      keyboardClose: true
    });
   return await toast.present();
  }

  async showNativeToast(message: string,
    position: 'bottom' | 'center' |'middle' | 'top' = 'bottom') {
    if (position === 'middle') { position = 'center'; }
    return await this.toast.show(message, '5000', position).toPromise();
  }

  async showAlert(message: string, header?: string,
   buttons?: any[], backdropDismiss = true) {
    buttons = buttons || [this.translate('OK')];

    await this.removeLoading();

    const alert = await this.alertController.create({
      message: message,
      header: header,
      buttons: buttons,
      backdropDismiss: backdropDismiss,
      translucent: true,
      keyboardClose: true
    });

    await alert.present();
    return alert;
  }

  async showLoading() {
    if (this.loading) { return this.loading; }
    if (this.isNativePlatform()) { return this.spinnerDialog.show(); }

    this.loading = await this.loadingController.create({
      translucent: true,
      keyboardClose: true
    });
    await this.loading.present();
    return this.loading;
  }

  async removeLoading() {
    if (this.isNativePlatform()) { this.spinnerDialog.hide(); }
    if (!this.loading) { return false; }

    await this.loading.dismiss();
    this.loading = null;
    return true;
  }

  translate(keys: string | string[], options= {}) {
    return this.translateService.instant(keys, options);
  }

  chanageConnectionstate(newState) {
    if (newState === 'none') { newState = null; }

    this.connectionState = newState;
  }

  isNativePlatform() {
    return this.platform.is(this.config.nativePaltform);
  }

  playSound(playSend = false) {
    playSend ? this.nativeAudio.play('sevd') : this.nativeAudio.play('receive');
  }

  scheduleNotification(medication) {
    const id = 88;
    this.localNotifications.schedule({
      id: id,
      title: 'Medication Time',
      text: `You need to take ${medication.name} ${medication.notes}`,
      foreground: true,
      color: '#06adbf',
      led: '#06adbf',
      smallIcon: 'res://drawable/ic_launcher',
      icon: 'res://drawable/ic_launcher',
      trigger: { at: new Date(new Date().getTime() + (3600000 * medication.every)) }
    });
    const sec = this.localNotifications.getScheduled(id);
    console.log('schedule...' , sec);
    return sec;
  }

  showError(err) {
    setTimeout(() => {
      this.showAlert(err.errorMessage || err.message, this.translate('ERROR'), [this.translate('CANCEL')]);
    }, 500);
  }
}
