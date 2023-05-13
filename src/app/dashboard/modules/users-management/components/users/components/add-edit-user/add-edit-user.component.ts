import { CheckValidityService } from '../../../../../../../shared/services/check-validity/check-validity.service';
import { PublicService } from './../../../../../../../shared/services/public.service';
import { patterns } from './../../../../../../../shared/configs/patternValidations';
import { Validators, FormBuilder } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  branches: any = [
    { name: 'branch' },
    { name: 'branch' },
    { name: 'branch' },
  ];
  isLoadingBranches: boolean = false;

  positions: any = [
    { name: 'position' },
    { name: 'position' },
    { name: 'position' },
  ];
  isLoadingPositions: boolean = false;

  departments: any = [
    { name: 'department' },
    { name: 'department' },
    { name: 'department' },
  ];
  isLoadingDepartments: boolean = false;

  jobTitles: any = [
    { name: 'jobtitle' },
    { name: 'jobtitle' },
    { name: 'jobtitle' },
  ];
  isLoadingJobTitles: boolean = false;
  constructor(
    private checkValidityService: CheckValidityService,
    public publicService: PublicService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
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
  // userForm = this.fb?.group({
  //   firstName: ['', { validators: [Validators.required, Validators.minLength(3)], updateOn: 'blur' }],
  //   lastName: ['', { validators: [Validators.required, Validators.minLength(3)], updateOn: 'blur' }],
  //   mobileNumber: ['', { validators: [Validators.required], updateOn: 'blur' }],
  //   email: ['', {
  //     validators: [
  //       Validators.required,
  //       Validators.pattern(patterns?.email)], updateOn: 'blur'
  //   }],
  //   username: ['', { validators: [Validators.required, Validators.pattern(patterns?.userName)], updateOn: 'blur' }],
  //   password: ['', { validators: [Validators.required, Validators.pattern(patterns?.password)], updateOn: 'blur' }],
  //   confirmPassword: ['', { validators: [Validators.required, Validators.pattern(patterns?.password)], updateOn: 'blur' }],
  // },

  // )

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
  next(stepper: MatStepper): void {
    if (this.userForm?.valid) {
      stepper.next();

    } else {
      this.checkValidityService?.validateAllFormFields(this.userForm);
    }
  }
}
