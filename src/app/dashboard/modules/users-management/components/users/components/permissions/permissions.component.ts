import { PublicService } from './../../../../../../../shared/services/public.service';
import { AlertsService } from './../../../../../../../core/services/alerts/alerts.service';
import { UsersService } from './../../../../../../services/user-management/users.service';
import { CheckValidityService } from './../../../../../../../shared/services/check-validity/check-validity.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  userRolesList: any = [];
  isLoadingUserRoles: boolean = false;

  userPermissionsList: any = [];
  isLoadingUserPermissions: boolean = false;

  selectedModulePermissions: any = [];
  ModulePermissions = [];

  toggleTree: boolean = false;
  toggleTreeUser: boolean = false;

  selectedUserRoles: any;
  selectedUserPermissions: any;

  constructor(
    private checkValidityService: CheckValidityService,
    private alertsService: AlertsService,
    private publicService: PublicService,
    private usersService: UsersService,
    private cdr: ChangeDetectorRef,
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getUserRoles();
    this.getUserPermissions();
  }

  roleForm = this.fb.group({
    userRoles: [null, [Validators.required]],
    userPermissions: [null, [Validators.required]],
  },
  );
  get formControls(): any {
    return this.roleForm?.controls;
  }
  getUserRoles(): any {
    this.isLoadingUserRoles = true;
    this.usersService?.getUserRoles()?.subscribe(
      (res: any) => {
        if (res?.code == 200) {
          res?.data?.forEach((permission: any) => {
            let childrenItems: any = []
            permission?.permissions.forEach((item: any) => {
              childrenItems.push({
                label: item?.name ? item?.name : '',
                id: item?.id ? item?.id : null,
                childId: item?.id ? item?.id : null
              })
            });
            this.userRolesList.push({
              label: permission?.name ? permission?.name : '',
              id: permission?.id ? permission?.id : '',
              parentId: permission?.id ? permission?.id : '',
              children: childrenItems
            })
          });
          // if (this.isEdit && this.usersRoleId) {
          //   this.getRoleData(this.usersRoleId);
          // }
          this.isLoadingUserRoles = false;
        } else {
          res?.message ? this.alertsService?.openSnackBar(res?.message) : '';
          this.isLoadingUserRoles = false;
        }
      },
      (err: any) => {
        err?.message ? this.alertsService?.openSnackBar(err?.message) : '';
        this.isLoadingUserRoles = false;
      });
    this.cdr?.detectChanges();


    this.userRolesList = [
      // {
      //   label: 'lkkk',
      //   id: 9,
      //   parentId: 7,
      //   children: [
      //     {
      //       label: 'hhhh',
      //       id: 2,
      //       childId: 2
      //     },
      //     {
      //       label: 'hhhh',
      //       id: 2,
      //       childId: 2
      //     }
      //   ]
      // }
      {
        "label": "Documents",
        "data": "Documents Folder",

        "children": [{
          "label": "Work",
          "data": "Work Folder",


          "children": [{ "label": "Expenses.doc", "data": "Expenses Document" }, { "label": "Resume.doc", "data": "Resume Document" }]
        },
        {
          "label": "Home",
          "data": "Home Folder",


          "children": [{ "label": "Invoices.txt", "data": "Invoices for this month" }]
        }]
      },
      {
        "label": "Pictures",
        "data": "Pictures Folder",
        "children": [
          { "label": "barcelona.jpg", "data": "Barcelona Photo" },
          { "label": "logo.jpg", "data": "PrimeFaces Logo" },
          { "label": "primeui.png", "data": "PrimeUI Logo" }]
      },
      {
        "label": "Movies",
        "data": "Movies Folder",
        "children": [{
          "label": "Al Pacino",
          "data": "Pacino Movies",
          "children": [{ "label": "Scarface", "data": "Scarface Movie" }, { "label": "Serpico", "icon": "pi pi-file-video", "data": "Serpico Movie" }]
        },
        {
          "label": "Robert De Niro",
          "data": "De Niro Movies",
          "children": [{ "label": "Goodfellas", "data": "Goodfellas Movie" }, { "label": "Untouchables", "data": "Untouchables Movie" }]
        }]
      }
    ]
  }
  getUserPermissions(): any {
    this.isLoadingUserPermissions = true;
    this.usersService?.getUserPermissions()?.subscribe(
      (res: any) => {
        if (res?.code == 200) {
          res?.data?.forEach((permission: any) => {
            let childrenItems: any = []
            permission?.permissions.forEach((item: any) => {
              childrenItems.push({
                label: item?.name ? item?.name : '',
                id: item?.id ? item?.id : null,
                childId: item?.id ? item?.id : null
              })
            });
            this.userPermissionsList.push({
              label: permission?.name ? permission?.name : '',
              id: permission?.id ? permission?.id : '',
              parentId: permission?.id ? permission?.id : '',
              children: childrenItems
            })
          });
          // if (this.isEdit && this.usersRoleId) {
          //   this.getRoleData(this.usersRoleId);
          // }
          this.isLoadingUserPermissions = false;
        } else {
          res?.message ? this.alertsService?.openSnackBar(res?.message) : '';
          this.isLoadingUserPermissions = false;
        }
      },
      (err: any) => {
        err?.message ? this.alertsService?.openSnackBar(err?.message) : '';
        this.isLoadingUserPermissions = false;
      });
    this.cdr?.detectChanges();


    this.userPermissionsList = [
      {
        "label": "Documents",
        "data": "Documents Folder",

        "children": [{
          "label": "Work",
          "data": "Work Folder",


          "children": [{ "label": "Expenses.doc", "data": "Expenses Document" }, { "label": "Resume.doc", "data": "Resume Document" }]
        },
        {
          "label": "Home",
          "data": "Home Folder",


          "children": [{ "label": "Invoices.txt", "data": "Invoices for this month" }]
        }]
      },
      {
        "label": "Pictures",
        "data": "Pictures Folder",
        "children": [
          { "label": "barcelona.jpg", "data": "Barcelona Photo" },
          { "label": "logo.jpg", "data": "PrimeFaces Logo" },
          { "label": "primeui.png", "data": "PrimeUI Logo" }]
      },
      {
        "label": "Movies",
        "data": "Movies Folder",
        "children": [{
          "label": "Al Pacino",
          "data": "Pacino Movies",
          "children": [{ "label": "Scarface", "data": "Scarface Movie" }, { "label": "Serpico", "icon": "pi pi-file-video", "data": "Serpico Movie" }]
        },
        {
          "label": "Robert De Niro",
          "data": "De Niro Movies",
          "children": [{ "label": "Goodfellas", "data": "Goodfellas Movie" }, { "label": "Untouchables", "data": "Untouchables Movie" }]
        }]
      }
    ]
  }
  nodeSelect(event: any) {
    this.ModulePermissions = event;
  }
  nodeUnselect(event: any): void {
    this.ModulePermissions = event;
  }

  updateSelectedNode(event: any, type?: any) {
    if (type == 'userPermissions') {
      this.selectedUserPermissions = event;
      console.log(this.roleForm?.value);
    } else {
      this.selectedUserRoles = event;
      console.log(this.roleForm?.value);

    }
  }
  nodeTreeSelect(event: any, type?: any): void {
    if (type == 'userPermissions') {
      this.formControls?.userPermissions?.setValue(this.selectedUserPermissions);
    } else {
      this.formControls?.availablePermissions?.setValue(this.selectedUserRoles);
    }
    console.log(this.roleForm?.value);
  }
  nodeTreeUnselect(event: any, type?: any): void {
    if (type == 'userPermissions') {
      this.formControls?.userPermissions?.setValue(this.selectedUserPermissions);
    } else {
      this.formControls?.availablePermissions?.setValue(this.selectedUserRoles);
    }
  }
  toggleTreeSelect(type?: any): void {
    if (type == 'userPermission') {
      this.toggleTreeUser = !this.toggleTreeUser;
    } else {
      this.toggleTree = !this.toggleTree;
    }
  }

  submit(): void {
    const myObject: { [key: string]: any } = {};
    if (this.roleForm?.valid) {
      this.publicService?.show_loader?.next(true);
      myObject['userRoles'] = this.roleForm?.value?.userRoles;
      myObject['userPermissions'] = this.roleForm?.value?.userPermissions;

      this.publicService?.show_loader?.next(true);
      this.usersService?.resetPassword(myObject)?.subscribe(
        (res: any) => {
          if (res?.status == "Success") {
            this.ref?.close({ listChanged: true });
            this.publicService?.show_loader?.next(false);
            res?.message ? this.alertsService?.openSweetAlert('success', res?.message) : '';
          } else {
            res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
            this.publicService?.show_loader?.next(false);
          }
        },
        (err: any) => {
          err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
          this.publicService?.show_loader?.next(false);
        });
    } else {
      this.publicService?.show_loader?.next(false);
      this.checkValidityService?.validateAllFormFields(this.roleForm);
    }
    this.cdr?.detectChanges();
  }
  cancel(): void {
    this.ref?.close();
  }
}
