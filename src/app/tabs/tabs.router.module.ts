import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: 'add-food',
            loadChildren: '../pages/add-food/add-food.module#AddFoodPageModule'
          },
          {
            path: '',
            loadChildren: './home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'my-medication',
        children: [
          {
            path: '',
            loadChildren: './my-medication/my-medication.module#MyMedicationPageModule'
          }
        ]
      },
      {
        path: 'contact-dr',
        children: [
          {
            path: '',
            loadChildren: './contact-dr/contact-dr.module#ContactDrPageModule'
          }
        ]
      },
      {
        path: 'my-patients',
        children: [
          {
            path: 'add-patient',
            loadChildren: '../pages/add-patient/add-patient.module#AddPatientPageModule'
          },
          {
            path: ':uid/add-medication',
            loadChildren: '../pages/add-medication/add-medication.module#AddMedicationPageModule'
          },
          {
            path: '',
            loadChildren: './my-patients/my-patients.module#MyPatientsPageModule'
          }
        ]
      },
      {
        path: 'contact-patient',
        children: [
          {
            path: 'patient-chat/:uid',
            loadChildren: '../pages/patient-chat/patient-chat.module#PatientChatPageModule'
          },
          {
            path: '',
            loadChildren: './contact-patient/contact-patient.module#ContactPatientPageModule'
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: './profile/profile.module#ProfilePageModule'
          }
        ]
      },
      {
        path: 'doctors-list',
        children: [
          {
            path: 'add-doctor',
            loadChildren: '../pages/add-doctor/add-doctor.module#AddDoctorPageModule'
          },
          {
            path: '',
            loadChildren: './doctors-list/doctors-list.module#DoctorsListPageModule'
          }
        ]
      },
      {
        path: 'more',
        children: [
          {
            path: 'help',
            loadChildren: '../pages/help/help.module#HelpPageModule'
          },
          {
            path: 'settings',
            loadChildren: '../pages/settings/settings.module#SettingsPageModule'
          },
          {
            path: '',
            loadChildren: './more/more.module#MorePageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login-options',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
