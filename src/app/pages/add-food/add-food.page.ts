import { ShowFoodPage } from './../show-food/show-food.page';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { NutritionsService } from '../../services/nutritions/nutritions.service';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.page.html',
  styleUrls: ['./add-food.page.scss'],
})

export class AddFoodPage implements OnInit {
foodList: any[];
searching;
  constructor(private userService: UserService,
    private nutritionsService: NutritionsService,
    public modalController: ModalController) { }

  ngOnInit() {
  }

  async showFood(food) {
    const modal = await this.modalController.create({
      component: ShowFoodPage,
      componentProps: { food: food },
      animated: true,
      backdropDismiss: true,
      keyboardClose: true,
      showBackdrop: true
    });
    await modal.present();
    // const { data } = await modal.onDidDismiss();
  }

  async search(q) {
    if (!q.target.value.trim()) { return this.clear(); }
    this.searching = true;
    const result: any = await this.nutritionsService.search(q.target.value);
    if (result.success) {
      this.foodList = result.data.common;
      this.searching = false;
    }
  }

  clear() {

  }
}
