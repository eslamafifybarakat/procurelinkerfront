import { AddEditRoleComponent } from './components/add-edit-role/add-edit-role.component';
import { DialogService } from 'primeng/dynamicdialog';
import { PublicService } from './../../../../../shared/services/public.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roles-management',
  templateUrl: './roles-management.component.html',
  styleUrls: ['./roles-management.component.scss']
})
export class RolesManagementComponent implements OnInit {
  isLoadingSearch: boolean = false;
  roleManagementData: any = [
    {
      id: 1,
      image: '../../../../../../assets/images/role/role.avif', name: 'SysAdmin', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, commodi similique non harum impedit, quia suscipit dolores sit!'
    },
    {
      id: 2,
      image: '../../../../../../assets/images/role/role.svg', name: 'SysAdmin', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, commodi similique non harum impedit, quia suscipit dolores sit!'
    },
    {
      image: '../../../../../../assets/images/role/role.png', name: 'SysAdmin', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, commodi similique non harum impedit, quia suscipit dolores sit!'
    },
    {
      image: '../../../../../../assets/images/role/download.png', name: 'SysAdmin', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, commodi similique non harum impedit, quia suscipit dolores sit!'
    }
  ]
  constructor(
    private publicService: PublicService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
  }
  searchHandlerEmit(value: any): void { }
  clearSearchValue(value: any): void { }

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
}
