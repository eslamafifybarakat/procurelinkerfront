import { RolesManagementComponent } from './components/roles-management/roles-management.component';
import { UsersManagementRoutingModule } from './users-management-routing.module';
import { UsersManagementComponent } from './users-management.component';
import { UsersComponent } from './components/users/users.component';
import { SharedModule } from './../../../shared/shared.module';
import { CoreModule } from './../../../core/core.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddEditUserComponent } from './components/users/components/add-edit-user/add-edit-user.component';
import { ResetPasswordComponent } from './components/users/components/reset-password/reset-password.component';
import { ConfirmLockAccountComponent } from './components/users/components/confirm-lock-account/confirm-lock-account.component';
import { UserDetailsComponent } from './components/users/components/user-details/user-details.component';
import { PermissionsComponent } from './components/users/components/permissions/permissions.component';

@NgModule({
  declarations: [
    UsersManagementComponent,
    UsersComponent,
    RolesManagementComponent,
    AddEditUserComponent,
    ResetPasswordComponent,
    ConfirmLockAccountComponent,
    UserDetailsComponent,
    PermissionsComponent
  ],
  imports: [
    CommonModule,
    UsersManagementRoutingModule,
    SharedModule,
    CoreModule
  ]
})
export class UsersManagementModule { }
