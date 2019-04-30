import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.page.html',
  styleUrls: ['./doctors-list.page.scss'],
})
export class DoctorsListPage implements OnInit {
  doctors: any[];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getDoctorsList();
  }

  getDoctorsList() {
    const result: any = this.userService.loadDoctorsList();

    if (result.success) { this.doctors = result.data; }
  }
}
