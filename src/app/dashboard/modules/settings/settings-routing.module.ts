import { WorkPositionsComponent } from './components/work-positions/work-positions.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { JobTitlesComponent } from './components/job-titles/job-titles.component';
import { BranchesComponent } from './components/branches/branches.component';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { NgModule } from '@angular/core';

// const routes: Routes = [{ path: '', component: UsersManagementComponent }];
// const permissions = permissionsList;

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'branches',
        component: BranchesComponent,
        // canActivate: [PermissionGuard],
        data: {
          // permission: permissions?.index?.IndexArticlesReports,
          // title: 'titles.articles',
          // enableHeaderSearch: true,
          // type: 'dashboard'
        }
      },
      {
        path: 'departments',
        component: DepartmentsComponent,
        // canActivate: [PermissionGuard],
        data: {
          // permission: permissions?.index?.IndexArticlesReports,
          // title: 'titles.articles',
          // enableHeaderSearch: true,
          // type: 'dashboard'
        }
      },
      {
        path: 'job-titles',
        component: JobTitlesComponent,
        // canActivate: [PermissionGuard],
        data: {
          // permission: permissions?.index?.IndexExamsReports,
          // title: 'titles.exams',
          // enableHeaderSearch: true,
          // type: 'dashboard'
        }
      },
      {
        path: 'work-positions',
        component: WorkPositionsComponent,
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
        redirectTo: 'branches',
        pathMatch: 'full',
      },
      { path: '**', redirectTo: 'welcome-dashboard' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
