import { RolesManagementComponent } from './components/roles-management/roles-management.component';
import { UsersManagementRoutingModule } from './users-management-routing.module';
import { UsersManagementComponent } from './users-management.component';
import { UsersComponent } from './components/users/users.component';
import { SharedModule } from './../../../shared/shared.module';
import { CoreModule } from './../../../core/core.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddEditUserComponent } from './components/users/components/add-edit-user/add-edit-user.component';

@NgModule({
  declarations: [
    UsersManagementComponent,
    UsersComponent,
    RolesManagementComponent,
    AddEditUserComponent
  ],
  imports: [
    CommonModule,
    UsersManagementRoutingModule,
    SharedModule,
    CoreModule
  ]
})
export class UsersManagementModule { }
