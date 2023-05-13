import { WelcomeDashboardComponent } from '../../components/welcome-dashboard/welcome-dashboard.component';
import { AddEditUserComponent } from './components/users/components/add-edit-user/add-edit-user.component';
import { RolesManagementComponent } from './components/roles-management/roles-management.component';
import { UsersManagementComponent } from './users-management.component';
import { UsersComponent } from './components/users/users.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// const routes: Routes = [{ path: '', component: UsersManagementComponent }];
// const permissions = permissionsList;

const routes: Routes = [
  {
    path: '',
    component: UsersManagementComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent,
        // canActivate: [PermissionGuard],
        data: {
          // permission: permissions?.index?.IndexArticlesReports,
          // title: 'titles.articles',
          // enableHeaderSearch: true,
          // type: 'dashboard'
        }
      },
      {
        path: 'add-edit-user',
        component: AddEditUserComponent,
        // canActivate: [PermissionGuard],
        data: {
          // permission: permissions?.index?.IndexArticlesReports,
          // title: 'titles.articles',
          // enableHeaderSearch: true,
          // type: 'dashboard'
        }
      },
      {
        path: 'roles-management',
        component: RolesManagementComponent,
        // canActivate: [PermissionGuard],
        data: {
          // permission: permissions?.index?.IndexExamsReports,
          // title: 'titles.exams',
          // enableHeaderSearch: true,
          // type: 'dashboard'
        }
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'welcome-dashboard',
        component: WelcomeDashboardComponent,
        data: {
          title: 'titles.welcome',
          enableHeaderSearch: true,
          type: 'dashboard'
        }
      },
      { path: '**', redirectTo: 'welcome-dashboard' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersManagementRoutingModule { }
