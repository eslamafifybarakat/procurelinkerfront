import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-lock-account',
  templateUrl: './confirm-lock-account.component.html',
  styleUrls: ['./confirm-lock-account.component.scss']
})
export class ConfirmLockAccountComponent implements OnInit {
  name: any;
  inputName: string = '';
  enableConfirm: boolean = false;
  confirmed: boolean = true;
  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
  ) { }

  ngOnInit(): void {
    this.name = this.config?.data?.full_name;
    this.enableConfirm = this?.config?.data?.enableConfirm;
  }

  confirm(): void {
    this.confirmed = true;
    this.ref?.close({ confirmed: this.confirmed });
  }

  cancel(): void {
    this.confirmed = false;
    this.ref?.close({ confirmed: this.confirmed });
  }
}
