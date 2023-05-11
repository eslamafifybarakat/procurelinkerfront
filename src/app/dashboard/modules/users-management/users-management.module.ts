import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersManagementRoutingModule } from './users-management-routing.module';
import { UsersManagementComponent } from './users-management.component';
import { UsersComponent } from './components/users/users.component';
import { RolesManagementComponent } from './components/roles-management/roles-management.component';


@NgModule({
  declarations: [
    UsersManagementComponent,
    UsersComponent,
    RolesManagementComponent
  ],
  imports: [
    CommonModule,
    UsersManagementRoutingModule
  ]
})
export class UsersManagementModule { }
