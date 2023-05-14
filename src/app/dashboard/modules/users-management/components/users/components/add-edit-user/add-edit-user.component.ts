import { PermissionsComponent } from './../permissions/permissions.component';
import { AlertsService } from './../../../../../../../core/services/alerts/alerts.service';
import { UsersService } from './../../../../../../services/user-management/users.service';
import { CheckValidityService } from '../../../../../../../shared/services/check-validity/check-validity.service';
import { PublicService } from './../../../../../../../shared/services/public.service';
import { patterns } from './../../../../../../../shared/configs/patternValidations';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  isLoading: boolean = false;
  isEdit: boolean = false;
  title: any;
  isLoadingUsers: boolean = false;
  accountData: any;
  userId: any;
  isFullLoading: boolean = false;

  branches: any = [];
  isLoadingBranches: boolean = false;

  positions: any = [];
  isLoadingPositions: boolean = false;

  departments: any = [];
  isLoadingDepartments: boolean = false;

  jobTitles: any = [];
  isLoadingJobTitles: boolean = false;

  constructor(
    private checkValidityService: CheckValidityService,
    private activatedRoute: ActivatedRoute,
    private alertsService: AlertsService,
    private dialogService: DialogService,
    public publicService: PublicService,
    private usersService: UsersService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.isEdit = this.userId ? true : false;

    if (this.isEdit) {
      this.getAccountData(this.userId);
    } else {
      this.getAllBranches();
      this.getAllPositions();
      this.getAllDepartments();
      this.getAllJobTitles();
    };
  }
  userForm = this.fb.group({
    basicInfo: this.fb.group({
      personalNo: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      userName: ['', [Validators.required, Validators.pattern(patterns?.userName)]],
      email: ['', [Validators.required, Validators.pattern(patterns?.email)]],
    }, { updateOn: 'blur' }),
    contactInfo: this.fb.group({
      phone: ['', [Validators.required]],
      extension: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
    }, { updateOn: 'blur' }),
    professionalInfo: this.fb.group({
      branch: ['', [Validators.required]],
      position: ['', [Validators.required]],
      department: ['', [Validators.required]],
      jobTitle: ['', [Validators.required]],
    }),
  })
  get formControls(): any {
    return this.userForm?.controls;
  };

  get userFormControls(): any {
    return this.userForm?.controls;
  }

  backStep(stepper: MatStepper): void {
    stepper.previous();
  }
  onStepChange(event: any): void {
    // this.preventCallFunctions = true;
    // if (event?.selectedIndex == 0) {
    //   this.countCity = 1;
    //   this.getAllServiceDetails(false);
    // }
  }

  getAllBranches(): any {
    this.isLoadingBranches = true;
    this.usersService?.getBranches()?.subscribe(
      (res: any) => {
        if (res?.statusCode == 200 && res?.isSuccess == true) {
          let arr: any = [];
          res?.data ? res?.data?.forEach((item: any) => {
            arr?.push({
              name: item?.name,
              id: item?.id
            });
          }) : '';
          this.branches = arr;
          if (this.isEdit) {
            this.branches?.forEach((item: any) => {
              if (item?.id == this.accountData?.branchId) {
                this.userForm?.patchValue({
                  professionalInfo: {
                    branch: item
                  }
                })
              }
            });
          }
          this.isLoadingBranches = false;
        } else {
          res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
          this.isLoadingBranches = false;
        }
      },
      (err: any) => {
        err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
        this.isLoadingBranches = false;
      });
    this.cdr?.detectChanges();
    this.branches = [{ id: 1, name: 'position1' },
    { id: 2, name: 'position' },
    { id: 3, name: 'position3' },]
    if (this.isEdit) {
      this.branches?.forEach((item: any) => {
        if (item?.id == this.accountData?.branchId) {
          this.userForm?.patchValue({
            professionalInfo: {
              branch: item
            }
          })
        }
      });
    }
  }
  getAllPositions(): any {
    this.isLoadingPositions = true;
    this.usersService?.getPositions()?.subscribe(
      (res: any) => {
        if (res?.statusCode == 200 && res?.isSuccess == true) {
          let arr: any = [];
          res?.data ? res?.data?.forEach((item: any) => {
            arr?.push({
              name: item?.name,
              id: item?.id
            });
          }) : '';
          this.positions = arr;
          if (this.isEdit) {
            this.positions?.forEach((item: any) => {
              if (item?.id == this.accountData?.positionId) {
                this.userForm?.patchValue({
                  professionalInfo: {
                    position: item
                  }
                })
              }
            });
          }
          this.isLoadingPositions = false;
        } else {
          res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
          this.isLoadingPositions = false;
        }
      },
      (err: any) => {
        err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
        this.isLoadingPositions = false;
      });
    this.cdr?.detectChanges();
    this.positions = [
      { id: 1, name: 'position 1' },
      { id: 2, name: 'position 2' },
      { id: 3, name: 'position 3' },
    ]
    if (this.isEdit) {
      this.positions?.forEach((item: any) => {
        if (item?.id == this.accountData?.positionId) {
          this.userForm?.patchValue({
            professionalInfo: {
              position: item
            }
          })
        }
      });
    }
  }
  getAllDepartments(): any {
    this.isLoadingDepartments = true;
    this.usersService?.getDepartments()?.subscribe(
      (res: any) => {
        if (res?.statusCode == 200 && res?.isSuccess == true) {
          let arr: any = [];
          res?.data ? res?.data?.forEach((item: any) => {
            arr?.push({
              name: item?.name,
              id: item?.id
            });
          }) : '';
          this.departments = arr;
          if (this.isEdit) {
            this.departments?.forEach((item: any) => {
              if (item?.id == this.accountData?.departmentId) {
                this.userForm?.patchValue({
                  professionalInfo: {
                    department: item
                  }
                })
              }
            });
          }
          this.isLoadingDepartments = false;
        } else {
          res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
          this.isLoadingDepartments = false;
        }
      },
      (err: any) => {
        err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
        this.isLoadingDepartments = false;
      });
    this.cdr?.detectChanges();
    this.departments = [

      { id: 1, name: 'department' },
      { id: 2, name: 'department' },
      { id: 4, name: 'department' },
    ];
    if (this.isEdit) {
      this.departments?.forEach((item: any) => {
        if (item?.id == this.accountData?.departmentId) {
          this.userForm?.patchValue({
            professionalInfo: {
              department: item
            }
          })
        }
      });
    }
  }
  getAllJobTitles(): any {
    this.isLoadingJobTitles = true;
    this.usersService?.getJobTitles()?.subscribe(
      (res: any) => {
        if (res?.statusCode == 200 && res?.isSuccess == true) {
          let arr: any = [];
          res?.data ? res?.data?.forEach((item: any) => {
            arr?.push({
              name: item?.name,
              id: item?.id
            });
          }) : '';
          this.jobTitles = arr;
          if (this.isEdit) {
            this.jobTitles?.forEach((item: any) => {
              if (item?.id == this.accountData?.jobTitleId) {
                this.userForm?.patchValue({
                  professionalInfo: {
                    jobTitle: item
                  }
                })
              }
            });
          }
          this.isLoadingJobTitles = false;
        } else {
          res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
          this.isLoadingJobTitles = false;
        }
      },
      (err: any) => {
        err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
        this.isLoadingJobTitles = false;
      });
    this.cdr?.detectChanges();
    this.jobTitles = [

      { id: 1, name: 'jobtitle' },
      { id: 3, name: 'jobtitle' },
      { id: 9, name: 'jobtitle' },
    ];
    if (this.isEdit) {
      this.jobTitles?.forEach((item: any) => {
        if (item?.id == this.accountData?.jobTitleId) {
          this.userForm?.patchValue({
            professionalInfo: {
              jobTitle: item
            }
          })
        }
      });
    }
  }

  getAccountData(id: number): void {
    this.isFullLoading = true;
    this.usersService?.getAccountById(id)?.subscribe(
      (res: any) => {
        if (res?.statusCode == 200 && res?.isSuccess == true) {
          this.accountData = res?.data ? res?.data : null;
          this.getAllBranches();
          this.getAllPositions();
          this.getAllDepartments();
          this.getAllJobTitles();
          this.patchValue();
          this.isFullLoading = false;
        } else {
          res?.message ? this.alertsService.openSweetAlert('info', res?.message) : '';
          this.isFullLoading = false;
        }
      },
      (err: any) => {
        err?.message ? this.alertsService.openSweetAlert('error', err?.message) : '';
        this.isFullLoading = false;
      });
    this.cdr?.detectChanges();

    this.accountData = {
      basicInfo: {
        personalNo: 1, firstName: 'Celine', lastName: 'Ahmed', userName: 'celine55', email: 'celine55@gmail.com'
      },
      contactInfo: {
        phone: '1222222',
        extension: '87262782872',
        mobile: '928277228'
      },
      branchId: 3,
      jobTitleId: 1,
      departmentId: 4,
      positionId: 1,
    }
    this.patchValue();
    this.getAllBranches();
    this.getAllPositions();
    this.getAllDepartments();
    this.getAllJobTitles();

  }
  patchValue(): void {
    this.userForm?.patchValue({
      basicInfo: {
        personalNo: this.accountData?.basicInfo?.personalNo,
        firstName: this.accountData?.basicInfo?.firstName,
        lastName: this.accountData?.basicInfo?.lastName,
        userName: this.accountData?.basicInfo?.userName,
        email: this.accountData?.basicInfo?.email,
      },
      contactInfo: {
        phone: this.accountData?.contactInfo?.phone,
        extension: this.accountData?.contactInfo?.extension,
        mobile: this.accountData?.contactInfo?.mobile,
      },

    })
  }
  submit(): void {
    let data: any = {};
    if (this.userForm?.valid) {

      const ref = this.dialogService?.open(PermissionsComponent, {
        // data: res?.data,
        header: this.publicService?.translateTextFromJson('dashboard.users.permissions'),
        dismissableMask: true,
        width: '40%',
        styleClass: 'custom_modal',
        closable: false,
      });
      ref.onClose.subscribe((res: any) => {
        this.router.navigate(['/dashboard/users-management/users']);
      });

      this.publicService?.show_loader?.next(true);
      data = {
        basicInfo: {
          personalNo: this.formControls?.basicInfo?.controls?.personalNo,
          firstName: this.formControls?.basicInfo?.controls?.firstName,
          lastName: this.formControls?.basicInfo?.controls?.lastName,
          userName: this.formControls?.basicInfo?.controls?.userName,
          email: this.formControls?.basicInfo?.controls?.email,
        },
        contactInfo: {
          phone: this.formControls?.contactInfo?.controls?.phone,
          extension: this.formControls?.contactInfo?.controls?.extension,
          mobile: this.formControls?.contactInfo?.controls?.mobile,
        },
        branchId: this.formControls?.professionalInfo?.controls?.branch?.id,
        jobTitleId: this.formControls?.professionalInfo?.controls?.jobTitle?.id,
        departmentId: this.formControls?.professionalInfo?.controls?.department?.id,
        positionId: this.formControls?.professionalInfo?.controls?.position?.id,
      }
      if (this.isEdit) {
        data['id'] = this.userId;
      }
      this.publicService?.show_loader?.next(true);
      this.usersService?.addOrUpdateUser(data, this.userId ? this.userId : null)?.subscribe(
        (res: any) => {
          if (res?.status == "Success") {
            const ref = this.dialogService?.open(PermissionsComponent, {
              data: res?.data,
              header: this.publicService?.translateTextFromJson('dashboard.users.permissions'),
              dismissableMask: true,
              width: '40%',
              styleClass: 'custom_modal',
              closable: false,
            });
            ref.onClose.subscribe((res: any) => {
              this.router.navigate(['/dashboard/users-management/users']);
            });
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
      this.checkValidityService?.validateAllFormFields(this.userForm);
    }
    this.cdr?.detectChanges();
  }
  cancel(): void {
    this.router?.navigate(['/dashboard/users-management/users']);
  }
}
