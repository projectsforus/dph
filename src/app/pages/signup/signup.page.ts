import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Validation } from '../../utils/validations';
import { UserService } from '../../services/user/user.service';
import { HelperService } from '../../services/helper/helper.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  showPassword: boolean;
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private helperService: HelperService
    ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(100), Validators.required])],
      lastName: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(100), Validators.required])],
      username: ['', Validators.compose([Validation.usernameValidator, Validators.required])],
      email: ['', Validators.compose([Validation.emailValidator, Validators.required])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(100), Validators.required])],
      fileNo: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(100)])]
    });
  }

  async register() {
    this.helperService.showLoading();
    const result: any = await this.userService.fbRegister(this.signupForm.value);
    if (result.success) {
      await this.userService.createProfile(this.signupForm.value);
      this.helperService.showSuccessMsg('SIGNUP.SUCCESS');
    } else {
      this.helperService.showError(result);
    }
  }
}
