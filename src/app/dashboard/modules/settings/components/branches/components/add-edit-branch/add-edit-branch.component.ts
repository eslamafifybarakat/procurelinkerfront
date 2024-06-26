import { patterns } from './../../../../../../../shared/configs/patternValidations';
import { CheckValidityService } from 'src/app/shared/services/check-validity/check-validity.service';
import { AlertsService } from './../../../../../../../core/services/alerts/alerts.service';
import { PublicService } from './../../../../../../../shared/services/public.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SettingsService } from './../../../../../../services/settings.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-edit-branch',
  templateUrl: './add-edit-branch.component.html',
  styleUrls: ['./add-edit-branch.component.scss']
})
export class AddEditBranchComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  isEdit: boolean = false;
  id: any;
  modalData: any;
  isFullLoading: boolean = false;

  branchForm: any = this.fb?.group({
    name: ['', [Validators.required, Validators?.pattern(patterns?.english)]],
    nameAr: ['', [Validators.required, Validators?.pattern(patterns?.arabic)]],
    description: ['', [Validators.required, Validators?.pattern(patterns?.english)]],
    descriptionAr: ['', [Validators.required, Validators?.pattern(patterns?.arabic)]],
  }, { updateOn: 'blur' }
  );
  get formControls(): any {
    return this.branchForm?.controls;
  }
  constructor(
    private checkValidityService: CheckValidityService,
    private settingsService: SettingsService,
    private alertsService: AlertsService,
    private config: DynamicDialogConfig,
    public publicService: PublicService,
    private ref: DynamicDialogRef,
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.modalData = this.config?.data;
    this.isEdit = this.modalData?.type == 'edit' ? true : false;
    if (this.isEdit == true) {
      this.id = this.modalData?.item?.id;
      this.getBranchById(this.id);
    }
  }

  getBranchById(id?: any): void {
    this.isFullLoading = true;
    this.settingsService?.getBranchById(id)?.subscribe((res: any) => {
      if (res) {
        this.branchForm?.patchValue({
          name: res.name ? res.name : '',
          nameAr: res.nameAr ? res.nameAr : '',
          description: res.description ? res.description : '',
          descriptionAr: res.descriptionAr ? res.descriptionAr : '',
        })
        this.isFullLoading = false;
      } else {
        res?.message ? this.alertsService?.openSweetAlert('error', res?.message) : '';
        this.isFullLoading = false;
      }
    },
      (err: any) => {
        err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
        this.isFullLoading = false;
      }
    );
  }
  submit(): void {
    if (this.branchForm?.valid) {
      const myObject: { [key: string]: any } = {};
      if (this.isEdit) {
        myObject['id'] = this.id;
      }
      myObject['name'] = this.branchForm.value?.name;
      myObject['nameAr'] = this.branchForm.value?.nameAr;
      myObject['description'] = this.branchForm.value?.description;
      myObject['descriptionAr'] = this.branchForm.value?.descriptionAr;

      this.publicService?.show_loader?.next(true);
      console.log(this.id);

      this.settingsService?.saveBranch(myObject)?.subscribe(
        (res: any) => {
          if (res) {
            this.ref.close({ listChanged: true });
            this.publicService?.show_loader?.next(false);
          } else {
            res?.message ? this.alertsService.openSweetAlert('error', res?.message) : '';
            this.publicService?.show_loader?.next(false);
          }
        },
        (err: any) => {
          err?.message ? this.alertsService.openSweetAlert('error', err?.message) : '';
          this.publicService?.show_loader?.next(false);
        });

    } else {
      this.checkValidityService?.validateAllFormFields(this.branchForm);
    }
  }
  cancel(): void {
    this.ref?.close({ isChangedList: false });
  }
  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}

