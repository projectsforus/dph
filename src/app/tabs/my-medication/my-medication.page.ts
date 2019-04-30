import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { HelperService } from '../../services/helper/helper.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-my-medication',
  templateUrl: './my-medication.page.html',
  styleUrls: ['./my-medication.page.scss'],
})
export class MyMedicationPage implements OnInit {

  myMedication: any[];

  constructor(private userService: UserService,
    private helperService: HelperService, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((fbauth) => {
      if (fbauth) {
        this.getMyMedicationList();
      }
    });
  }

  ngOnInit() {
  }

  getMyMedicationList() {
    const result: any = this.userService.loadMyMedicationList();

    if (result.success) { this.myMedication = result.data; }
  }

  setReminder(medication) {
    if (!medication.every) { return; }

    const date = new Date(new Date().getTime() + (3600000 * medication.every)).toLocaleTimeString();
    this.helperService.showAlert(`Next dose must be after ${medication.every} hours from now at: ${date}`, 'Warning!', [
      this.helperService.translate('CANCEL'),
      {
        text: 'Agree',
        handler: () => {
          this.helperService.scheduleNotification(medication);
          this.helperService.showToast(`A reminder has been scheduled for the
           next dose at: ${date}`);
        }
      }
    ]);
  }
}
