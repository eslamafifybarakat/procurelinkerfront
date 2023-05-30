import { WorkPositionsComponent } from './components/work-positions/work-positions.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { JobTitlesComponent } from './components/job-titles/job-titles.component';
import { BranchesComponent } from './components/branches/branches.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsComponent } from './settings.component';
import { CoreModule } from './../../../core/core.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddEditBranchComponent } from './components/branches/components/add-edit-branch/add-edit-branch.component';
import { AddEditDepartmentComponent } from './components/departments/components/add-edit-department/add-edit-department.component';
import { AddEditJobTitleComponent } from './components/job-titles/components/add-edit-job-title/add-edit-job-title.component';
import { AddEditPositionComponent } from './components/work-positions/components/add-edit-position/add-edit-position.component';

@NgModule({
  declarations: [
    SettingsComponent,
    BranchesComponent,
    DepartmentsComponent,
    JobTitlesComponent,
    WorkPositionsComponent,
    AddEditBranchComponent,
    AddEditDepartmentComponent,
    AddEditJobTitleComponent,
    AddEditPositionComponent
  ],
  imports: [
    SettingsRoutingModule,
    CommonModule,
    SharedModule,
    CoreModule
  ]
})
export class SettingsModule { }
