import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../../services/user/user.service';
import { HelperService } from './../../services/helper/helper.service';
import { NutritionsService } from '../../services/nutritions/nutritions.service';

@Component({
  selector: 'app-show-food',
  templateUrl: './show-food.page.html',
  styleUrls: ['./show-food.page.scss'],
})
export class ShowFoodPage implements OnInit {
  @Input() food: any;
  nutritions: any = {};
  totalNutritions: any = {};
  normals: any = {};
  currentNutritions: any = {
    iron: 0,
    protein: 0,
    phosphorus: 0,
    sodium: 0,
    potassium: 0,
    vitaminb12: 0,
    folicacid: 0,
  };

  constructor(private modalController: ModalController,
    private helperService: HelperService,
    private userService: UserService,
    private nutritionsService: NutritionsService) { }

  ngOnInit() {
    this.normals = this.nutritionsService.getNormalNutritions();
    this.filterNutritions();
    this.getCurrentNutritionOfToday();
  }

  async getCurrentNutritionOfToday() {
    const today = (new Date()).toDateString();
    const result = await this.userService.loadCopyOfNutritionsOfDay(today);
    if (result) { this.currentNutritions = result; }
    this.calcTotalNutritions();
  }

  filterNutritions() {
    this.nutritions.iron = this.food.full_nutrients.find((nutrition) => {
      return nutrition.attr_id === 303;
    });
    this.nutritions.vitaminb12 = this.food.full_nutrients.find((nutrition) => {
      return nutrition.attr_id === 418;
    });
    this.nutritions.folicacid = this.food.full_nutrients.find((nutrition) => {
      return nutrition.attr_id === 431;
    });
    this.nutritions.protein = this.food.full_nutrients.find((nutrition) => {
      return nutrition.attr_id === 203;
    });
    this.nutritions.phosphorus = this.food.full_nutrients.find((nutrition) => {
      return nutrition.attr_id === 305;
    });
    this.nutritions.sodium = this.food.full_nutrients.find((nutrition) => {
      return nutrition.attr_id === 307;
    });
    this.nutritions.potassium = this.food.full_nutrients.find((nutrition) => {
      return nutrition.attr_id === 306;
    });
  }

  checkTotals() {
    if (
      (this.totalNutritions.protein / this.normals.protein) > 1 ||
      (this.totalNutritions.phosphorus / this.normals.phosphorus) > 1 ||
      (this.totalNutritions.sodium / this.normals.sodium) > 1 ||
      (this.totalNutritions.potassium / this.normals.potassium) > 1
    ) {
      this.helperService.showAlert('One or more nutrition value will be exceed', 'Warning!', [
        this.helperService.translate('CANCEL'),
        {
          text: 'It is Ok',
          handler: () => {
            this.addFood();
          }
        }
      ]);
    } else {
      this.addFood();
    }
  }

  addFood() {
    this.userService.addFood(this.food);
    this.userService.setFoodNutrition(this.totalNutritions);
    this.helperService.showSuccessMsg('ADD_FOOD.FOOD_ADDED');
    this.dismiss(true);
  }

  calcTotalNutritions() {
    this.totalNutritions.iron = (this.nutritions.iron.value + Number(this.currentNutritions.iron)).toFixed(4);
    this.totalNutritions.vitaminb12 = (this.nutritions.vitaminb12.value + Number(this.currentNutritions.vitaminb12 || 0)).toFixed(4);
    this.totalNutritions.folicacid = (this.nutritions.folicacid.value + Number(this.currentNutritions.folicacid || 0)).toFixed(4);
    this.totalNutritions.protein = (this.nutritions.protein.value + Number(this.currentNutritions.protein)).toFixed(4);
    this.totalNutritions.phosphorus = (this.nutritions.phosphorus.value + Number(this.currentNutritions.phosphorus)).toFixed(4);
    this.totalNutritions.sodium = (this.nutritions.sodium.value + Number(this.currentNutritions.sodium)).toFixed(4);
    this.totalNutritions.potassium = (this.nutritions.potassium.value + Number(this.currentNutritions.potassium)).toFixed(4);
  }

  progressColor(progress) {
    return (progress > 0.90 ? 'danger' : (progress > 0.75 ? 'warning' : (progress > 0.50 ? 'primary' : 'success')));
  }

  progressColorMin(progress) {
    return (progress > 0.90 ? 'success' : (progress > 0.75 ? 'primary' : (progress > 0.50 ? 'warning' : 'danger')));
  }

  dismiss(addFood = false) {
    this.modalController.dismiss({
      addFood: addFood
    });
  }
}
