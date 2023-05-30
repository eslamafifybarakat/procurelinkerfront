
import { SettingsService } from './../../../../services/settings.service';
import { AlertsService } from './../../../../../core/services/alerts/alerts.service';
import { PublicService } from './../../../../../shared/services/public.service';
import { AddEditPositionComponent } from './components/add-edit-position/add-edit-position.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable, Subscription, map } from 'rxjs';


@Component({
  selector: 'app-work-positions',
  templateUrl: './work-positions.component.html',
  styleUrls: ['./work-positions.component.scss']
})
export class WorkPositionsComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  isLoadingSearch: boolean = false;
  isSearch: boolean = false;
  isLoadingFileDownload: boolean = false;

  loadingIndicator: boolean = false;
  positionsList$!: Observable<any>;
  positionsCount: number = 0;
  tableHeaders: any = [];

  page: number = 1;
  perPage: number = 5;
  pagesCount: number = 0;
  rowsOptions: number[] = [5, 10, 15, 30];

  enableSortFilter: boolean = true;
  searchKeyword: any = null;
  filtersArray: any = [];
  sortObj: any = {};
  isAddedOrEdit: boolean = false;

  constructor(
    private settingsService: SettingsService,
    private activatedRoute: ActivatedRoute,
    private publicService: PublicService,
    private dialogService: DialogService,
    private alertsService: AlertsService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.tableHeaders = [
      // { field: 'emo_number', header: this.publicService?.translateTextFromJson('dashboard.tableHeader.id'), title: this.publicService?.translateTextFromJson('dashboard.tableHeader.id') },
      { field: 'name', header: this.publicService?.translateTextFromJson('dashboard.tableHeader.name'), title: this.publicService?.translateTextFromJson('dashboard.tableHeader.name'), sort: true, showDefaultSort: true, showAscSort: false, showDesSort: false, filter: true, type: 'text' },
      { field: 'nameAr', header: this.publicService?.translateTextFromJson('dashboard.tableHeader.nameAr'), title: this.publicService?.translateTextFromJson('dashboard.tableHeader.email'), sort: false, showDefaultSort: true, showAscSort: false, showDesSort: false, filter: true, type: 'text' },
      { field: 'description', header: this.publicService?.translateTextFromJson('dashboard.tableHeader.description'), title: this.publicService?.translateTextFromJson('dashboard.tableHeader.description'), filter: true, type: 'text' },
      { field: 'descriptionAr', header: this.publicService?.translateTextFromJson('dashboard.tableHeader.descriptionAr'), title: this.publicService?.translateTextFromJson('dashboard.tableHeader.descriptionAr'), filter: true, type: 'text' },
    ];
    this.getAllJobTitles();
    this.isAddedOrEdit = this.activatedRoute.snapshot.params['isAddedOrEdit'];
  }

  getAllJobTitles(): any {
    // this.loadingIndicator = true;
    // this.settingsService?.getBranches()
    //   .pipe(
    //     map((res: any) => {
    //       this.positionsCount = res?.total;
    //       this.pagesCount = Math.ceil(this.positionsCount / this.perPage);
    //       let arr: any = [];
    //       res?.data ? res?.data?.forEach((item: any, index: any) => {
    //         let name: any = '';
    //         name = item?.firstName + ' ' + item?.lastName;
    //         arr.push({
    //           id: item?.id ? item?.id : '',
    //           emo_number: index + 1,
    //           name: item?.name ? item?.name : '',
    //           nameAr: item?.nameAr ? item?.nameAr : '',
    //           description: item?.description ? item?.description : '',
    //           descriptionAr: item?.descriptionAr ? item?.descriptionAr : '',
    //         });
    //       }) : '';
    //       this.positionsList$ = arr;
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

    this.positionsCount = 20;
    let data: any = [];
    data = [
      { id: 1, emo_number: 1, name: 'Ahmed mohamed', nameAr: 'احمد محمد', description: 'description', descriptionAr: "الوصف بالعربي" }, { id: 1, emo_number: 1, name: 'Ahmed mohamed', nameAr: 'احمد محمد', description: 'description', descriptionAr: "الوصف بالعربي" }, { id: 1, emo_number: 1, name: 'Ahmed mohamed', nameAr: 'احمد محمد', description: 'description', descriptionAr: "الوصف بالعربي" }, { id: 1, emo_number: 1, name: 'Ahmed mohamed', nameAr: 'احمد محمد', description: 'description', descriptionAr: "الوصف بالعربي" },
    ]
    this.positionsList$ = data
  }
  getUsers(): void {
    let arr: any = this.positionsList$
    arr?.length == 0 ? this.getAllJobTitles() : '';
  }

  search(event: any): void {
    this.isLoadingSearch = true;
    this.searchKeyword = event;
    if (event?.length > 0) {
      this.isSearch = true;
    }
    this.page = 1;
    this.publicService?.changePageSub?.next({ page: this.page });
    this.getAllJobTitles();
  }
  onPageChange(e: any): void {
    this.page = e?.page + 1;
    this.getAllJobTitles();
  }
  onPaginatorOptionsChange(e: any): void {
    this.perPage = e?.value;
    this.pagesCount = Math?.ceil(this.positionsCount / this.perPage);
    console.log(this.pagesCount);
    this.page = 1;
    this.publicService?.changePageSub?.next({ page: this.page });

  }

  addOrEditItem(item?: any, type?: any): void {
    const ref = this.dialogService?.open(AddEditPositionComponent, {
      data: {
        item,
        type: type == 'edit' ? 'edit' : 'add'
      },
      header: type == 'edit' ? this.publicService?.translateTextFromJson('dashboard.positions.editPosition') : this.publicService?.translateTextFromJson('dashboard.positions.addPosition'),
      width: '50%',
      dismissableMask: false,
      styleClass: 'custom_modal',
    });

    ref?.onClose?.subscribe((res: any) => {
      if (res?.listChanged) {
        this.getAllJobTitles();
      }
    });
  }
  deleteItem(item: any): void {
    if (item?.confirmed) {
      this.publicService?.show_loader.next(true);
      this.settingsService?.deleteBranch(item?.item?.id)?.subscribe(
        (res: any) => {
          if (res?.statusCode == 200 && res?.isSuccess == true) {
            res?.message ? this.alertsService?.openSweetAlert('success', res?.message) : '';
            this.getAllJobTitles();
            this.publicService?.show_loader?.next(false);
          } else {
            res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
            this.publicService?.show_loader?.next(false);
          }
        },
        (err) => {
          err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
          this.publicService?.show_loader?.next(false);
        });
    }
    this.cdr.detectChanges();
  }


  clearTable(event: any): void {
    this.searchKeyword = '';
    this.sortObj = {};
    this.filtersArray = [];
    this.page = 1;
    this.publicService?.changePageSub?.next({ page: this.page });
    this.getAllJobTitles();
  }
  sortItems(event: any): void {
    if (event?.order == 1) {
      this.sortObj = {
        column: event?.field,
        order: 'asc'
      }
      this.getAllJobTitles();
    } else if (event?.order == -1) {
      this.sortObj = {
        column: event?.field,
        order: 'desc'
      }
      this.getAllJobTitles();
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
    this.getAllJobTitles();
  }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
function finalize(arg0: () => void): import("rxjs").OperatorFunction<void, unknown> {
  throw new Error('Function not implemented.');
}




