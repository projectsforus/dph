import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyPatientsPage } from './my-patients.page';
import { PatientInfoPage } from './../../pages/patient-info/patient-info.page';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: MyPatientsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild()

  ],
  declarations: [MyPatientsPage, PatientInfoPage],
  entryComponents: [PatientInfoPage]

})
export class MyPatientsPageModule {}
