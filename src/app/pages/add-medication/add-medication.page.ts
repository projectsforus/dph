import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { HelperService } from '../../services/helper/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-medication',
  templateUrl: './add-medication.page.html',
  styleUrls: ['./add-medication.page.scss'],
})
export class AddMedicationPage implements OnInit {
  patientUid: string;
  medicationForm: FormGroup;
  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private helperService: HelperService,
    private router: Router) { }

  ngOnInit() {
    this.patientUid = this.route.snapshot.paramMap.get('uid');
    this.medicationForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(100), Validators.required])],
      fromDate: ['', Validators.compose([Validators.required])],
      toDate: ['', Validators.compose([Validators.required])],
      quantity: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(100), Validators.required])],
      every: ['8', Validators.compose([Validators.maxLength(100), Validators.required])],
      notes: ['After eating', Validators.compose([Validators.minLength(3), Validators.maxLength(100), Validators.required])],
    });
  }

  async save() {
    const result = await this.userService.addMedication(this.patientUid, this.medicationForm.value);
    if (result.success) {
      this.router.navigate(['/tabs/my-patients']);
      this.helperService.showSuccessMsg('New medication has been added');
    } else {
      this.helperService.showError(result.error);
    }
  }

}
