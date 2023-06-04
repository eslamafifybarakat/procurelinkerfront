import { ConfirmDeleteComponent } from './../../../../../shared/components/confirm-delete/confirm-delete.component';
import { RolesManagementService } from './../../../../services/user-management/roles-management.service';
import { AddEditRoleComponent } from './components/add-edit-role/add-edit-role.component';
import { AlertsService } from './../../../../../core/services/alerts/alerts.service';
import { PublicService } from './../../../../../shared/services/public.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { RoleDetailsComponent } from './components/role-details/role-details.component';

@Component({
  selector: 'app-roles-management',
  templateUrl: './roles-management.component.html',
  styleUrls: ['./roles-management.component.scss']
})
export class RolesManagementComponent implements OnInit {
  isLoadingSearch: boolean = false;
  rolesManagementList: any = [];
  isLoadingRoleManagementData: boolean = false;

  constructor(
    private rolesManagementService: RolesManagementService,
    private publicService: PublicService,
    private dialogService: DialogService,
    private alertsService: AlertsService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getRolesManagementList();
  }
  searchHandlerEmit(value: any): void { }
  clearSearchValue(value: any): void { }

  getRolesManagementList(): any {
    this.isLoadingRoleManagementData = true;
    this.rolesManagementService?.getRolesManagement()?.subscribe(
      (res: any) => {
        if (res?.code == 200) {
          this.rolesManagementList = res?.data ? res?.data : '';
          this.isLoadingRoleManagementData = false;
        } else {
          res?.message ? this.alertsService?.openSnackBar(res?.message) : '';
          this.isLoadingRoleManagementData = false;
        }
      },
      (err: any) => {
        err?.message ? this.alertsService?.openSnackBar(err?.message) : '';
        this.isLoadingRoleManagementData = false;
      });
    this.cdr?.detectChanges();

    this.rolesManagementList = [
      {
        id: 1,
        image: '../../../../../../assets/images/role/role.svg', name: 'SysAdmin', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, commod quia suscipit dolores sit!'
      },
      {
        id: 2,
        image: '../../../../../../assets/images/role/role.svg', name: 'SysAdmin', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, commodi similique non harum impedit, quia suscipit dolores sit!'
      },
      {
        id: 3,
        image: '../../../../../../assets/images/role/role.svg', name: 'SysAdmin', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, commodi dolores sit!'
      },
      {
        id: 4,
        image: '../../../../../../assets/images/role/role.svg', name: 'SysAdmin', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, commodi similique non harum impedit, quia suscipit dolores sit!'
      },
    ];
  }

  addOrEditRole(item?: any, type?: any): void {
    const ref = this.dialogService?.open(AddEditRoleComponent, {
      data: {
        item,
        type: type == 'edit' ? 'edit' : 'add'
      },
      header: type == 'edit' ? this.publicService?.translateTextFromJson('dashboard.roleManagement.editRole') : this.publicService?.translateTextFromJson('dashboard.roleManagement.addRole'),
      width: '50%',
      dismissableMask: false,
      styleClass: 'custom_modal',
    });

    ref?.onClose?.subscribe((res: any) => {
      if (res?.listChanged) {
      }
    });
  }
  itemDetails(item: any) {
    const ref = this.dialogService.open(RoleDetailsComponent, {
      data: item,
      header: this.publicService?.translateTextFromJson('dashboard.roleManagement.roleDetails'),
      dismissableMask: false,
      width: '40%'
    });

    ref.onClose.subscribe((res: any) => {
      if (res?.confirmed) {
        this.getRolesManagementList();
      }
    });
  }

  deleteItem(item: any) {
    console.log(item);

    const ref = this.dialogService.open(ConfirmDeleteComponent, {
      data: {
        name: item['name'],
      },
      header: this.publicService?.translateTextFromJson('general.confirm_delete'),
      dismissableMask: false,
      width: '35%'
    });

    ref.onClose.subscribe((res: any) => {
      if (res?.confirmed) {
        this.getRolesManagementList();
      }
    });
  }
}
