import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Validation } from '../../utils/validations';
import { UserService } from '../../services/user/user.service';
import { HelperService } from '../../services/helper/helper.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.page.html',
  styleUrls: ['./add-doctor.page.scss'],
})
export class AddDoctorPage implements OnInit {
  signupForm: FormGroup;
  showPassword: boolean;
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private helperService: HelperService,
    private splashScreen: SplashScreen) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(100), Validators.required])],
      lastName: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(100), Validators.required])],
      username: ['', Validators.compose([Validation.usernameValidator, Validators.required])],
      email: ['', Validators.compose([Validation.emailValidator, Validators.required])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(100), Validators.required])]
    });
  }

  async addDr() {
    this.helperService.showLoading();
    this.splashScreen.show();
    const result: any = await this.userService.fbRegister(this.signupForm.value);
    console.log(result);
    if (result.success) {
      await this.userService.createDrProfile(this.signupForm.value);
      await this.userService.loginAdmin();
      this.splashScreen.hide();
      this.helperService.showSuccessMsg('SIGNUP.SUCCESS');
    } else {
      this.helperService.showError(result);
    }
  }
}
