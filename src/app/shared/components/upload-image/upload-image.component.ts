import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormBuilder } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BrowseImageOrVideoComponent } from '../browse-image-or-video/browse-image-or-video.component';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  @Input() multiple: boolean = false;
  @Input() maxFileSize: any = 1000000;
  @Input() uploadText: string = this.publicService?.translateTextFromJson('general.Upload');
  @Input() acceptFille: any = 'image/*';
  @Input() type: any = '';
  @Input() enablePreview: boolean = false;
  @Input() isEdit: boolean = false;
  @Input() showFile: boolean = false;
  @Input() isEditImage: string = '';
  @Input() maximumSize: any = '10 kb';
  @Input() videoName: any = '';
  @Input() videoSrc: any = '';
  @Output() filesHandler: EventEmitter<any> = new EventEmitter();

  uploadedFiles: any = [];
  showCancel: boolean = false;


  @Input() fileSrc: any;
  fileName: any;
  isLoadingImage: boolean = false;
  hasError: boolean = false;
  showImageName: boolean = false;

  constructor(
    private publicService: PublicService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    if (this.isEdit) {
      this.showFile = true;
    }
    this.publicService.emitEditPatchImagePreview.subscribe((res: any) => {
      if (res?.imageSrc) {
        this.isEditImage = res?.imageSrc;
      }
    });
  }

  onSelectEvent(event?: any): void {
    this.uploadedFiles = event?.currentFiles;
    this.fileName = event?.currentFiles[0].name
    this.upload();
    this.filesHandler?.emit({ files: this.uploadedFiles });
    this.showCancel = true;
    this.showFile = true;
    this.isLoadingImage = true;
    this.hasError = false;
    if (this.uploadedFiles?.length == 0) {
      this.showFile = false;
      this.hasError = true;
    }
  }

  upload(): void {
    let fileReader = new FileReader();
    for (let file of this.uploadedFiles) {
      fileReader.readAsDataURL(file);
      fileReader.onload = this._handleReaderLoaded.bind(this);
    }
  }

  _handleReaderLoaded(e: any): void {
    var reader = e.target;
    this.isEdit ? this.isEditImage = reader?.result : this.fileSrc = reader.result
    // this.fileSrc = reader.result;
    this.isLoadingImage = false;
  }

  browse(): void {
    let data: any;
    if (this.type == 'image') {
      this.dialog.open(BrowseImageOrVideoComponent, {
        width: "40%",
        data: { src: this.isEdit ? this.isEditImage ? this.isEditImage : 'assets/image/not-found/no-img.svg' : this.fileSrc, type: this.type }
      });
    } else {
      this.dialog.open(BrowseImageOrVideoComponent, {
        width: "40%",
        data: { src: this.fileSrc, type: this.type }
      });
    }

    // this.dialogService.open(BrowseImageOrVideoComponent, {
    //   // header: 'Choose a Product',
    //   width: '70%',
    //   contentStyle: { "overflow": "auto", "padding": 0 },
    //   dismissableMask:true,
    //     maximizable:true,
    // });
  }

  removeItem(event: any): void {
    console.log(event.file);
    this.uploadedFiles?.forEach((file: any, index: any) => {
      if (file == event?.file) {
        this.uploadedFiles?.splice(index, 1);
      }
      console.log(this.uploadedFiles);
    });
    this.filesHandler?.emit({ files: this.uploadedFiles })
  }

  clearItems(event: any): void {
    this.filesHandler?.emit({ files: null });
    this.showCancel = false;
    this.showFile = false;
  }

}
