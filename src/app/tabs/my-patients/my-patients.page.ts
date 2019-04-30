import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { HelperService } from '../../services/helper/helper.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ModalController } from '@ionic/angular';
import { PatientInfoPage } from './../../pages/patient-info/patient-info.page';

@Component({
  selector: 'app-my-patients',
  templateUrl: './my-patients.page.html',
  styleUrls: ['./my-patients.page.scss'],
})

export class MyPatientsPage implements OnInit {
  myPatients: any[];

  constructor(private userService: UserService,
    private helperService: HelperService, public afAuth: AngularFireAuth,
    private modalController: ModalController) {
      this.afAuth.authState.subscribe((fbauth) => {
        if (fbauth) {
          this.getMyPatientsList();
        }
      });
    }

  ngOnInit() {

  }

  getMyPatientsList() {
    const result: any = this.userService.loadMyPatientsList();

    if (result.success) { this.myPatients = result.data; }
  }

  async patientInfo(patient) {
    const modal = await this.modalController.create({
      component: PatientInfoPage,
      componentProps: { patient: patient },
      animated: true,
      backdropDismiss: true,
      keyboardClose: true,
      showBackdrop: true
    });
    await modal.present();
  }
}
