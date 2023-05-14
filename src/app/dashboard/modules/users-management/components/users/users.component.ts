import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UsersService } from './../../../../services/user-management/users.service';
import { PublicService } from './../../../../../shared/services/public.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable, Subscription, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmLockAccountComponent } from './components/confirm-lock-account/confirm-lock-account.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  isLoadingSearch: boolean = false;
  isSearch: boolean = false;
  isLoadingFileDownload: boolean = false;

  loadingIndicator: boolean = false;
  usersList$!: Observable<any>;
  usersCount: number = 0;
  tableHeaders: any = [];

  page: number = 1;
  perPage: number = 5;
  pagesCount: number = 0;
  rowsOptions: number[] = [5, 10, 15, 30];

  enableSortFilter: boolean = true;
  searchKeyword: any = null;
  filtersArray: any = [];
  sortObj: any = {};

  constructor(
    private publicService: PublicService,
    private dialogService: DialogService,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tableHeaders = [
      { field: 'full_name', header: this.publicService?.translateTextFromJson('dashboard.tableHeader.name'), title: this.publicService?.translateTextFromJson('dashboard.tableHeader.name'), sort: true, showDefaultSort: true, showAscSort: false, showDesSort: false, filter: true, type: 'text' },
      { field: 'email', header: this.publicService?.translateTextFromJson('dashboard.tableHeader.email'), title: this.publicService?.translateTextFromJson('dashboard.tableHeader.email'), sort: true, showDefaultSort: true, showAscSort: false, showDesSort: false, filter: true, type: 'text' },
      { field: 'mobileNumber', header: this.publicService?.translateTextFromJson('dashboard.tableHeader.mobilePhone'), title: this.publicService?.translateTextFromJson('dashboard.tableHeader.mobilePhone'), filter: true, type: 'text' },
      { field: 'permissions', header: this.publicService?.translateTextFromJson('dashboard.tableHeader.permissions'), title: this.publicService?.translateTextFromJson('dashboard.tableHeader.permissions'), filter: true, type: 'filterArray', dataType: 'array', list: 'permissions', placeholder: this.publicService?.translateTextFromJson('placeholder.permission'), label: this.publicService?.translateTextFromJson('labels.permission') },
    ];
    this.getAllUsers();
  }

  getAllUsers(): any {
    this.loadingIndicator = true;
    // this.usersService?.getUsersList(this.page, this.perPage, this.searchKeyword ? this.searchKeyword : null, this.sortObj ? this.sortObj : null, this.filtersArray ? this.filtersArray : null)
    //   .pipe(
    //     map((res: any) => {
    //       this.usersCount = res?.total;
    //       this.pagesCount = Math.ceil(this.usersCount / this.perPage);
    //       let arr: any = [];
    //       res?.data ? res?.data?.forEach((item: any, index: any) => {
    //         let name: any = '';
    //         name = item?.firstName + ' ' + item?.lastName;
    //         arr.push({
    //           id: item?.id ? item?.id : '',
    //           emo_number: index + 1,
    //           full_name: name,
    //           username: item?.username ? item?.username : '',
    //           email: item?.email ? item?.email : '',
    //           mobileNumber: item?.mobileNumber ? item?.mobileNumber : '',
    //         });
    //       }) : '';
    //       // this.usersList$ = arr;
    //     }),
    //     finalize(() => {
    //       this.loadingIndicator = false;
    //       this.isLoadingSearch = false;
    //       this.enableSortFilter = false;
    //       setTimeout(() => {
    //         this.enableSortFilter = true;
    //       }, 200);
    //     })

    //   ).subscribe((res: any) => {
    //   });

    this.usersCount = 20;
    let data: any = [];
    data = [
      { id: 1, image: '../../../../../../assets/images/logo/sm-logo.svg', emo_number: 1, full_name: 'Ahmed mohamed', username: 'ahmed44', mobileNumber: '122222', email: 'Ahmed33@gmail.com', permissions: [{ id: 2, name: 'permission1' }, { id: 3, name: 'permission2' }], is_active: true },
      { id: 1, emo_number: 1, full_name: 'Ali mohamed', username: 'ahmed44', mobileNumber: '122222', email: 'Ali533@gmail.com', permissions: [], is_active: false },
      { id: 1, emo_number: 1, full_name: 'Marwan mohamed', username: 'ahmed44', mobileNumber: '122222', email: 'Ahmed33@gmail.com', permissions: [{ id: 2, name: 'permission1' }, { id: 3, name: 'permission2' }, { id: 3, name: 'permission3' }], is_active: false },
      { id: 1, emo_number: 1, full_name: 'celine mohamed', username: 'ahmed44', mobileNumber: '122222', email: 'celine33@gmail.com', permissions: [{ id: 2, name: 'permission1' }], is_active: false },
      { id: 1, emo_number: 1, full_name: 'nour mohamed', username: 'ahmed44', mobileNumber: '122222', email: 'Ahmed33@gmail.com', permissions: [{ id: 2, name: 'permission1' }, { id: 3, name: 'permission2' }, { id: 3, name: 'permission3' }, { id: 3, name: 'permission3' }, { id: 3, name: 'permission3' }, { id: 3, name: 'permission3' }], is_active: true },
      { id: 1, emo_number: 1, full_name: 'Ahmed mohamed', username: 'ahmed44', mobileNumber: '122222', email: 'Ahmed33@gmail.com', permissions: [], is_active: true }
    ]
    this.usersList$ = data
  }
  getUsers(): void {
    let arr: any = this.usersList$
    arr?.length == 0 ? this.getAllUsers() : '';
  }

  search(event: any): void {
    this.isLoadingSearch = true;
    this.searchKeyword = event;
    if (event?.length > 0) {
      this.isSearch = true;
    }
    this.page = 1;
    this.publicService?.changePageSub?.next({ page: this.page });
    this.getAllUsers();
  }
  onPageChange(e: any): void {
    this.page = e?.page + 1;
    this.getAllUsers();
  }
  onPaginatorOptionsChange(e: any): void {
    this.perPage = e?.value;
    this.pagesCount = Math?.ceil(this.usersCount / this.perPage);
    console.log(this.pagesCount);
    this.page = 1;
    this.publicService?.changePageSub?.next({ page: this.page });

  }

  itemDetails(item: any): void {
    const ref = this.dialogService?.open(UserDetailsComponent, {
      data: item,
      header: this.publicService?.translateTextFromJson('dashboard.users.userDetails'),
      dismissableMask: true,
      width: '40%',
      styleClass: 'custom_modal'
    });
  }
  addOrEditItem(item?: any, type?: any): void {
    console.log(item);
    type == 'edit' ? this.router.navigate(['/dashboard/users-management/add-edit-user', { id: item?.id }]) : this.router.navigate(['/dashboard/users-management/add-edit-user']);
  }
  resetPassword(item: any): void {
    const ref = this.dialogService?.open(ResetPasswordComponent, {
      data: item,
      header: this.publicService?.translateTextFromJson('form.resetPassword'),
      dismissableMask: false,
      width: '50%',
      styleClass: 'custom_modal'
    });
    ref.onClose.subscribe((res: any) => {
      if (res?.listChanged) {
        this.page = 1;
        this.getAllUsers();
      }
    });
  }
  lockAccount(item: any) {
    const ref = this.dialogService?.open(ConfirmLockAccountComponent, {
      data: item,
      header: this.publicService?.translateTextFromJson('general.lockAccount'),
      dismissableMask: false,
      width: '35%',
    });
    ref.onClose.subscribe((res: any) => {
      if (res?.confirmed) { }
    });
  }

  clearTable(event: any): void {
    this.searchKeyword = '';
    this.sortObj = {};
    this.filtersArray = [];
    this.page = 1;
    this.publicService?.changePageSub?.next({ page: this.page });
    this.getAllUsers();
  }
  sortItems(event: any): void {
    if (event?.order == 1) {
      this.sortObj = {
        column: event?.field,
        order: 'asc'
      }
      this.getAllUsers();
    } else if (event?.order == -1) {
      this.sortObj = {
        column: event?.field,
        order: 'desc'
      }
      this.getAllUsers();
    }
  }
  filterItems(event: any): void {
    this.filtersArray = [];
    Object.keys(event)?.forEach((key: any) => {
      this.tableHeaders?.forEach((colHeader: any) => {
        if (colHeader?.field == key) {
          event[key]?.forEach((record: any) => {
            record['type'] = colHeader?.type;
          });
        }
      });
    });
    Object.keys(event).forEach((key: any) => {
      event[key]?.forEach((record: any) => {
        if (record['type'] && record['value'] !== null) {
          let filterData;
          if (record['type'] == 'text' || record['type'] == 'date' || record['type'] == 'numeric' || record['type'] == 'status') {
            let data: any;
            if (record['type'] == 'date') {
              data = new Date(record?.value?.setDate(record?.value?.getDate() + 1));
              record.value = new Date(record?.value?.setDate(record?.value?.getDate() - 1));
            } else {
              data = record?.value;
            }

            filterData = {
              column: key,
              type: record?.type,
              data: data,
              operator: record?.matchMode
            }
          }

          else if (record['type'] == 'filterArray') {
            let arr: any = [];
            record?.value?.forEach((el: any) => {
              arr?.push(el?.id || el?.value);
            });
            if (arr?.length > 0) {
              filterData = {
                column: key,
                type: 'relation',
                data: arr
              }
            }
          }
          else if (record['type'] == 'boolean') {
            filterData = {
              column: key,
              type: record?.type,
              data: record?.value
            }
          }
          if (filterData) {
            this.filtersArray?.push(filterData);
          }
        }
      });
    });
    this.page = 1;
    this.publicService?.changePageSub?.next({ page: this.page });
    this.getAllUsers();
  }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
function finalize(arg0: () => void): import("rxjs").OperatorFunction<void, unknown> {
  throw new Error('Function not implemented.');
}

