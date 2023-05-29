import { WelcomeDashboardComponent } from './components/welcome-dashboard/welcome-dashboard.component';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'welcome-dashboard',
        component: WelcomeDashboardComponent,
        data: {
          title: 'titles.welcome',
          type: 'dashboard'
        }
      },
      {
        path: 'users',
        component: UsersComponent,
        data: {
          title: 'titles.users',
          type: 'dashboard'
        }
      },
      {
        path: 'users-management',
        loadChildren: () => import('./modules/users-management/users-management.module')
          .then(m => m.UsersManagementModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./modules/settings/settings.module')
          .then(m => m.SettingsModule)
      },
      {
        path: '',
        redirectTo: 'welcome-dashboard',
        pathMatch: 'full',
      },
      { path: '**', redirectTo: 'error' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
