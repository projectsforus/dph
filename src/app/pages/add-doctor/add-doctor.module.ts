import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDoctorPage } from './add-doctor.page';

import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
const routes: Routes = [
  {
    path: '',
    component: AddDoctorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [AddDoctorPage]
})
export class AddDoctorPageModule {}
