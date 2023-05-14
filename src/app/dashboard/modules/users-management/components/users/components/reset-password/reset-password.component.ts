import { AlertsService } from './../../../../../../../core/services/alerts/alerts.service';
import { CheckValidityService } from './../../../../../../../shared/services/check-validity/check-validity.service';
import { ConfirmPasswordValidator } from './../../../../../../../shared/configs/confirm-password-validator';
import { UsersService } from './../../../../../../services/user-management/users.service';
import { patterns } from './../../../../../../../shared/configs/patternValidations';
import { PublicService } from './../../../../../../../shared/services/public.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  modalData: any;
  userId: any;
  constructor(
    public checkValidityService: CheckValidityService,
    public alertsService: AlertsService,
    public publicService: PublicService,
    private config: DynamicDialogConfig,
    private usersService: UsersService,
    private cdr: ChangeDetectorRef,
    private ref: DynamicDialogRef,
    protected router: Router,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.modalData = this.config?.data;
    this.userId = this.modalData?.id;
  }

  resetPasswordForm = this.fb?.group(
    {
      newPassword: ['', {
        validators: [
          Validators.required,
          Validators?.pattern(patterns?.password),
        ], updateOn: "blur"
      }],
      confirmPassword: ['', {
        validators: [
          Validators.required,
          Validators?.pattern(patterns?.password),
        ], updateOn: "blur"
      }],
    },
    {
      validator: ConfirmPasswordValidator.MatchPassword
    }
  );
  get formControls(): any {
    return this.resetPasswordForm?.controls;
  }


  submit(): void {
    const myObject: { [key: string]: any } = {};
    if (this.resetPasswordForm?.valid) {
      this.publicService?.show_loader?.next(true);
      myObject['userId'] = this.userId;
      myObject['password'] = this.resetPasswordForm?.value?.password;

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
      this.checkValidityService?.validateAllFormFields(this.resetPasswordForm);
    }
    this.cdr?.detectChanges();
  }
  cancel(): void {
    this.ref?.close({});
  }
  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
