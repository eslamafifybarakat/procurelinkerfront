import { patterns } from './../../../../../../../shared/configs/patternValidations';
import { PublicService } from './../../../../../../../shared/services/public.service';
import { AlertsService } from './../../../../../../../core/services/alerts/alerts.service';
import { UsersService } from './../../../../../../services/user-management/users.service';
import { CheckValidityService } from './../../../../../../../shared/services/check-validity/check-validity.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-edit-role',
  templateUrl: './add-edit-role.component.html',
  styleUrls: ['./add-edit-role.component.scss']
})
export class AddEditRoleComponent implements OnInit {
  availablePermissionsList: any = [];
  isLoadingAvailablePermissions: boolean = false;
  // availablePermissions: any;
  toggleTree: boolean = false;
  toggleTreeTwo: boolean = false;

  userPermissionsList: any = [];
  isLoadingUserPermissions: boolean = false;

  selectedModulePermissions: any = [];
  ModulePermissions = [];
  isEdit: boolean = false;
  roleId: any;
  fileSrcImage: any;
  editImage: any = null;

  selectedAvailablePermissions: any;
  selectedUserPermissions: any;

  modalData: any;
  constructor(
    private checkValidityService: CheckValidityService,
    private alertsService: AlertsService,
    public publicService: PublicService,
    private usersService: UsersService,
    public config: DynamicDialogConfig,
    private cdr: ChangeDetectorRef,
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.modalData = this.config?.data;
    this.roleId = this.modalData?.item?.id;
    this.isEdit = this.roleId ? true : false;
    if (this.isEdit) {
      this.patchValue();
    } else {
      this.getUserRoles();
      this.getUserPermissions();
    }
  }

  roleForm: any = this.fb.group({
    active: [false, []],
    image: ['', { validators: [Validators.required] }],
    name: ['', { validators: [Validators.required, Validators?.pattern(patterns?.english)], updateOn: 'blur' }],
    nameAr: ['', { validators: [Validators.required, Validators?.pattern(patterns?.arabic)], updateOn: 'blur' }],
    description: ['', { validators: [Validators.required, Validators?.pattern(patterns?.english)], updateOn: 'blur' }],
    descriptionAr: ['', { validators: [Validators.required, Validators?.pattern(patterns?.arabic)], updateOn: 'blur' }],
    availablePermissions: ['', [Validators.required]],
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
    ];
    if (this.isEdit) {
      let arr: any =
        [
          {
            "label": "Movies",
            "data": "Movies Folder",
            "children": [
              {
                "label": "Al Pacino",
                "data": "Pacino Movies",
                "children": [
                  {
                    "label": "Scarface",
                    "data": "Scarface Movie",
                    "partialSelected": false
                  },
                  {
                    "label": "Serpico",
                    "icon": "pi pi-file-video",
                    "data": "Serpico Movie",
                    "partialSelected": false
                  }
                ],
                "partialSelected": false
              },
              {
                "label": "Robert De Niro",
                "data": "De Niro Movies",
                "children": [
                  {
                    "label": "Goodfellas",
                    "data": "Goodfellas Movie",
                    "partialSelected": false
                  },
                  {
                    "label": "Untouchables",
                    "data": "Untouchables Movie",
                    "partialSelected": false
                  }
                ],
                "partialSelected": false
              }
            ],
            "partialSelected": false
          },
          {
            "label": "Al Pacino",
            "data": "Pacino Movies",
            "children": [
              {
                "label": "Scarface",
                "data": "Scarface Movie",
                "partialSelected": false
              },
              {
                "label": "Serpico",
                "icon": "pi pi-file-video",
                "data": "Serpico Movie",
                "partialSelected": false
              }
            ],
            "partialSelected": false
          },
          {
            "label": "Scarface",
            "data": "Scarface Movie",
            "partialSelected": false
          },
          {
            "label": "Serpico",
            "icon": "pi pi-file-video",
            "data": "Serpico Movie",
            "partialSelected": false
          },
          {
            "label": "Robert De Niro",
            "data": "De Niro Movies",
            "children": [
              {
                "label": "Goodfellas",
                "data": "Goodfellas Movie",
                "partialSelected": false
              },
              {
                "label": "Untouchables",
                "data": "Untouchables Movie",
                "partialSelected": false
              }
            ],
            "partialSelected": false
          },
          {
            "label": "Goodfellas",
            "data": "Goodfellas Movie",
            "partialSelected": false
          },
          {
            "label": "Untouchables",
            "data": "Untouchables Movie",
            "partialSelected": false
          }
        ]
      this.roleForm?.patchValue(
        {
          "availablePermissions": [
            {
              "label": "Pictures",
              "data": "Pictures Folder",
              "children": [
                {
                  "label": "barcelona.jpg",
                  "data": "Barcelona Photo",
                  "partialSelected": false
                },
                {
                  "label": "logo.jpg",
                  "data": "PrimeFaces Logo",
                  "partialSelected": false
                },
                {
                  "label": "primeui.png",
                  "data": "PrimeUI Logo",
                  "partialSelected": false
                }
              ],
              "partialSelected": false
            },
            {
              "label": "barcelona.jpg",
              "data": "Barcelona Photo",
              "partialSelected": false
            },
            {
              "label": "logo.jpg",
              "data": "PrimeFaces Logo",
              "partialSelected": false
            },
            {
              "label": "primeui.png",
              "data": "PrimeUI Logo",
              "partialSelected": false
            }
          ],

        }
      )
      // this.roleForm?.patchValue({
      //   availablePermissions: arr
      // });
      // this.selectedAvailablePermissions = arr;
    }
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


    this.userPermissionsList =
      [
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
      ];
    if (this.isEdit) {
      this.roleForm?.patchValue(
        {
          "userPermissions": [
            {
              "label": "Movies",
              "data": "Movies Folder",
              "children": [
                {
                  "label": "Al Pacino",
                  "data": "Pacino Movies",
                  "children": [
                    {
                      "label": "Scarface",
                      "data": "Scarface Movie",
                      "partialSelected": false
                    },
                    {
                      "label": "Serpico",
                      "icon": "pi pi-file-video",
                      "data": "Serpico Movie",
                      "partialSelected": false
                    }
                  ],
                  "partialSelected": false
                },
                {
                  "label": "Robert De Niro",
                  "data": "De Niro Movies",
                  "children": [
                    {
                      "label": "Goodfellas",
                      "data": "Goodfellas Movie",
                      "partialSelected": false
                    },
                    {
                      "label": "Untouchables",
                      "data": "Untouchables Movie",
                      "partialSelected": false
                    }
                  ],
                  "partialSelected": false
                }
              ],
              "partialSelected": false
            },
            {
              "label": "Al Pacino",
              "data": "Pacino Movies",
              "children": [
                {
                  "label": "Scarface",
                  "data": "Scarface Movie",
                  "partialSelected": false
                },
                {
                  "label": "Serpico",
                  "icon": "pi pi-file-video",
                  "data": "Serpico Movie",
                  "partialSelected": false
                }
              ],
              "partialSelected": false
            },
            {
              "label": "Scarface",
              "data": "Scarface Movie",
              "partialSelected": false
            },
            {
              "label": "Serpico",
              "icon": "pi pi-file-video",
              "data": "Serpico Movie",
              "partialSelected": false
            },
            {
              "label": "Robert De Niro",
              "data": "De Niro Movies",
              "children": [
                {
                  "label": "Goodfellas",
                  "data": "Goodfellas Movie",
                  "partialSelected": false
                },
                {
                  "label": "Untouchables",
                  "data": "Untouchables Movie",
                  "partialSelected": false
                }
              ],
              "partialSelected": false
            },
            {
              "label": "Goodfellas",
              "data": "Goodfellas Movie",
              "partialSelected": false
            },
            {
              "label": "Untouchables",
              "data": "Untouchables Movie",
              "partialSelected": false
            }
          ]
        }
      )
    }
  }
  updateSelectedNode(event: any, type?: any) {
    if (type == 'userPermissions') {
      this.selectedUserPermissions = event;
      console.log(this.roleForm?.value);
    } else {
      this.selectedAvailablePermissions = event;
      console.log(this.roleForm?.value);

    }
  }
  nodeSelect(event: any, type?: any) {
    // if (type == 'userPermissions') {
    //   this.formControls?.userPermissions?.setValue(this.selectedUserPermissions);
    // } else {
    //   this.formControls?.availablePermissions?.setValue(this.selectedAvailablePermissions);
    // }
  }
  nodeUnselect(event: any, type?: any): void {
    // if (type == 'userPermissions') {
    //   this.formControls?.userPermissions?.setValue(this.selectedUserPermissions);
    // } else {
    //   this.formControls?.availablePermissions?.setValue(this.selectedAvailablePermissions);
    // }
  }
  nodeTreeSelect(event: any, type?: any): void {
    if (type == 'userPermissions') {
      this.formControls?.userPermissions?.setValue(this.selectedUserPermissions);
    } else {
      this.formControls?.availablePermissions?.setValue(this.selectedAvailablePermissions);
    }
    console.log(this.roleForm?.value);
  }
  nodeTreeUnselect(event: any, type?: any): void {
    if (type == 'userPermissions') {
      this.formControls?.userPermissions?.setValue(this.selectedUserPermissions);
    } else {
      this.formControls?.availablePermissions?.setValue(this.selectedAvailablePermissions);
    }
  }
  toggleTreeSelect(type?: any): void {
    if (type == 'userPermission') {
      this.toggleTreeTwo = !this.toggleTreeTwo;
    } else {
      this.toggleTree = !this.toggleTree;
    }
  }

  patchValue(): void {
    this.roleForm?.patchValue(
      {
        "active": true,
        "image": {
          "objectURL": {
            "changingThisBreaksApplicationSecurity": "blob:http://localhost:4200/f33f2c9f-b25f-4d03-a0e6-eacf5e6b274a"
          }
        },
        "name": "Colt Rollins",
        "nameAr": "عربي",
        "description": "Veritatis proident ",
        "descriptionAr": "الوصف",

      }
    )
    this.editImage = 'https://i.pinimg.com/236x/18/0d/ff/180dffaa23dd263c714ba4a03d7f6b34.jpg';
    this.getUserRoles();
    this.getUserPermissions();
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
    this.fileSrcImage = event?.files !== null ? event?.files[0] : null;
    this.roleForm?.patchValue({
      image: event?.files !== null ? event?.files[0] : null,
    });
    let fileReader = new FileReader();
    for (let file of event?.files) {
      fileReader.readAsDataURL(file);
      fileReader.onload = this._handleReaderLoadedImage.bind(this);
    }
  }
  _handleReaderLoadedImage(e: any): void {
    var reader = e.target;
  }
}
