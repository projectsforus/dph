import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-contact-patient',
  templateUrl: './contact-patient.page.html',
  styleUrls: ['./contact-patient.page.scss'],
})
export class ContactPatientPage implements OnInit {
  myPatients: any[];
  constructor(private userService: UserService,
    public afAuth: AngularFireAuth) {
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
}
