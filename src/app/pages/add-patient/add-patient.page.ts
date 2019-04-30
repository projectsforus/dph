import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.page.html',
  styleUrls: ['./add-patient.page.scss'],
})
export class AddPatientPage implements OnInit {
  patients: any[];
  filteredPatients: any[] = [];
  searching;
  filter;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
   this.getPatientsList();

  }

  getPatientsList() {
    const result: any = this.userService.loadPatientsList();

    if (result.success) { this.patients = result.data; }
  }

  async save(patient) {
    const result: any = await this.userService.addDrToPatient(patient);
    if (result.success) {
      this.router.navigate(['/tabs/my-patients']);
    }
  }

  async search(q) {
    if (!q.target.value.trim()) { return this.clear(); }

    this.searching = true;
    this.filter = true;
    const result: any = await this.userService.filterPatients(q.target.value);
    this.filteredPatients = result;
    this.searching = false;
  }

  clear() {
    this.filter = false;
    this.filteredPatients = [];
  }
}
