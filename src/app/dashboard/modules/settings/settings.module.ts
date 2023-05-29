import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { BranchesComponent } from './components/branches/branches.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { JobTitlesComponent } from './components/job-titles/job-titles.component';
import { WorkPositionsComponent } from './components/work-positions/work-positions.component';


@NgModule({
  declarations: [
    SettingsComponent,
    BranchesComponent,
    DepartmentsComponent,
    JobTitlesComponent,
    WorkPositionsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
