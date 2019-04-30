import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.page.html',
  styleUrls: ['./patient-info.page.scss'],
})
export class PatientInfoPage implements OnInit {
  @Input() patient: any;
  profile;
  medications;

  constructor(private userService: UserService, private modalController: ModalController) { }

  ngOnInit() {
    this.getPatientProfile();
    this.getMedicationList();
  }

  dismiss(addFood = false) {
    this.modalController.dismiss();
  }

  async getPatientProfile() {
    const result: any = await this.userService.fbLoadProfie(this.patient.uid, 'users');
    if (result.success) {
      this.profile = result.data;
    }
  }

  async getMedicationList() {
    const result: any = await this.userService.loadPatientMedicationList(this.patient.uid);
    if (result.success) {
      this.medications = result.data;
    }
  }
}
