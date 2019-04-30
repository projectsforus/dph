import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Validation } from '../../utils/validations';
import { UserService } from '../../services/user/user.service';
import { HelperService } from '../../services/helper/helper.service';

@Component({
  selector: 'app-login-dr',
  templateUrl: './login-dr.page.html',
  styleUrls: ['./login-dr.page.scss'],
})
export class LoginDrPage implements OnInit {

  public loginForm: FormGroup;
  showPassword: boolean;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private helperService: HelperService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validation.emailValidator])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(100), Validators.required])],
    });
  }

  async login() {
    this.helperService.showLoading();
    const result: any = await this.userService.fbLoginDoctor(this.loginForm.value);
    if (result.success) {
      this.userService.setDoctor();
      this.helperService.showSuccessMsg('LOGIN.SUCCESS');
    } else {
      this.helperService.showError(result);
    }
  }

}
