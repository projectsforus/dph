import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { HelperService } from './../../services/helper/helper.service';
import { NutritionsService } from './../../services/nutritions/nutritions.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  featuredOffers: any[];
  segment = 'food';
  today: any = (new Date()).getFullYear();
  foods: any[];
  loading = true;
  nutritions: any;
  day;
  normals: any = {};
  constructor(
    private helperService: HelperService,
    private userService: UserService,
    private nutritionsService: NutritionsService,
    public afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe((fbauth) => {
      if (fbauth) {
        this.day = (new Date()).toDateString();
        this.getFoodOfDay(this.day);
        this.getNutritionOfDay(this.day);
      }
    });
   }

  ngOnInit() {
    this.normals = this.nutritionsService.getNormalNutritions();
  }

  async getFoodOfDay(day?) {
    const today = (new Date()).toDateString();
    const result: any = await this.userService.loadFoodOfDay(day || today);
    if ( result.success) { this.foods = result.data; }
    setTimeout(() => {
       this.loading = false;
      }, 3000);
    }

    async getNutritionOfDay(day?) {
      const today = (new Date()).toDateString();
      const result: any = await this.userService.loadNutritionsOfDay(day || today);
      if (result.success) { this.nutritions = result.data; }
    }

    progressColor(progress) {
      return (progress > 0.90 ? 'danger' : (progress > 0.75 ? 'warning' : (progress > 0.50 ? 'primary' : 'success')));
    }

    progressColorMin(progress) {
      return (progress > 0.90 ? 'success' : (progress > 0.75 ? 'primary' : (progress > 0.50 ? 'warning' : 'danger')));
    }

    segmentChanged() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    }

    changeDay() {
      this.loading = true;
      const formatedDay = (new Date(this.day)).toDateString();
      this.getFoodOfDay(formatedDay);
      this.getNutritionOfDay(formatedDay);
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    }
  }
