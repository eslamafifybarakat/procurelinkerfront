import { Router } from '@angular/router';
import { PublicService } from './../../../../../../../shared/services/public.service';
import { AlertsService } from './../../../../../../../core/services/alerts/alerts.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  modalData: any;
  userId: any;
  permissions: any = [];
  constructor(
    private config: DynamicDialogConfig,
    public alertsService: AlertsService,
    public publicService: PublicService,
    private cdr: ChangeDetectorRef,
    private ref: DynamicDialogRef,
    protected router: Router,
  ) { }


  ngOnInit(): void {
    this.modalData = this.config?.data;
    this.userId = this.modalData?.id;
    this.permissions = this.modalData?.permissions;
  }

  edit(): void {
    this.ref?.close();
    this.router?.navigate(['/dashboard/users-management/add-edit-user', { id: this.userId }])
  }

  cancel(): void {
    this.ref?.close({ listChanged: false });
  }
}
