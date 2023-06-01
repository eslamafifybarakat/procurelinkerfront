import { patterns } from './../../../../../../../shared/configs/patternValidations';
import { PublicService } from './../../../../../../../shared/services/public.service';
import { AlertsService } from './../../../../../../../core/services/alerts/alerts.service';
import { UsersService } from './../../../../../../services/user-management/users.service';
import { CheckValidityService } from './../../../../../../../shared/services/check-validity/check-validity.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-edit-role',
  templateUrl: './add-edit-role.component.html',
  styleUrls: ['./add-edit-role.component.scss']
})
export class AddEditRoleComponent implements OnInit {
  availablePermissionsList: any = [];
  isLoadingAvailablePermissions: boolean = false;
  availablePermissions: any;
  toggleTree: boolean = false;
  toggleTreeTwo: boolean = false;

  userPermissionsList: any = [];
  isLoadingUserPermissions: boolean = false;

  selectedModulePermissions: any = [];
  ModulePermissions = [];
  isEditImage: boolean = false;
  editImage: boolean = false;
  isEdit: boolean = false;
  ImageFile: any;

  selectedFiles2: any;
  constructor(
    private checkValidityService: CheckValidityService,
    private alertsService: AlertsService,
    public publicService: PublicService,
    private usersService: UsersService,
    private cdr: ChangeDetectorRef,
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getUserRoles();
    this.getUserPermissions();
    this.publicService.emitEditPatchImagePreview.subscribe((res: any) => {
      if (res?.imageSrc) {
        this.isEditImage = res?.imageSrc;
      }
    });
  }

  roleForm = this.fb.group({
    active: ['', []],
    image: ['', []],
    name: ['', [Validators.required, Validators?.pattern(patterns?.english)]],
    nameAr: ['', [Validators.required, Validators?.pattern(patterns?.arabic)]],
    description: ['', [Validators.required, Validators?.pattern(patterns?.english)]],
    descriptionAr: ['', [Validators.required, Validators?.pattern(patterns?.arabic)]],
    availablePermissions: [null, [Validators.required]],
    userPermissions: [null, [Validators.required]],
  },
  );
  get formControls(): any {
    return this.roleForm?.controls;
  }
  getUserRoles(): any {
    this.isLoadingAvailablePermissions = true;
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
            this.availablePermissionsList.push({
              label: permission?.name ? permission?.name : '',
              id: permission?.id ? permission?.id : '',
              parentId: permission?.id ? permission?.id : '',
              children: childrenItems
            })
          });
          // if (this.isEdit && this.usersRoleId) {
          //   this.getRoleData(this.usersRoleId);
          // }
          this.isLoadingAvailablePermissions = false;
        } else {
          res?.message ? this.alertsService?.openSnackBar(res?.message) : '';
          this.isLoadingAvailablePermissions = false;
        }
      },
      (err: any) => {
        err?.message ? this.alertsService?.openSnackBar(err?.message) : '';
        this.isLoadingAvailablePermissions = false;
      });
    this.cdr?.detectChanges();


    this.availablePermissionsList = [
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
    this.selectedModulePermissions = event;
    console.log(event);
    console.log(this.selectedModulePermissions);
  }
  nodeUnselect(event: any): void {
    this.selectedModulePermissions = event;
    console.log(event);
  }
  nodeTreeSelect(event: any): void {
    console.log(event);
    // this.roleForm?.patchValue({
    //   availablePermissions: event?.node
    // })
  }
  nodeTreeUnselect(event: any): void {
    console.log(event);
    // this.roleForm?.patchValue({
    //   availablePermissions: event?.node
    // })
  }
  toggleTreeSelect(type?: any): void {
    if (type == 'userPermission') {
      this.toggleTreeTwo = !this.toggleTreeTwo;
    } else {
      this.toggleTree = !this.toggleTree;
    }
  }

  submit(): void {
    const myObject: { [key: string]: any } = {};
    if (this.roleForm?.valid) {
      this.publicService?.show_loader?.next(true);
      myObject['availablePermissions'] = this.roleForm?.value?.availablePermissions;
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

  getUploadFiles(event?: any): void {
    this.ImageFile = event?.files !== null ? event?.files[0] : null;
    this.roleForm?.patchValue({
      image: event?.files !== null ? event?.files[0] : null,
    });
  }
}
