import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { HelperService } from '../../services/helper/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  showPassword: boolean;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private helperService: HelperService
    ) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(100)])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(100), Validators.required])],
    });
  }

  async login() {
    this.helperService.showLoading();
    const result: any = await this.userService.fbLogin(this.loginForm.value);
    if (result.success) {
      this.helperService.showSuccessMsg('LOGIN.SUCCESS');
    } else {
      this.helperService.showError(result);
    }
  }

}
