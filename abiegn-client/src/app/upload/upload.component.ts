import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadService } from '@app/util/upload.service';

const DEFAULT_FILENAME = 'Choose my car configuration (*.html)...';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  fileName = DEFAULT_FILENAME;
  @ViewChild('file') file: any;
  specFile: File;

  _showProgress = false;
  uploadProgress = 0;
  sub: any;

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
  }

  onFileChosen(e: any) {
    this.fileName = e.target.value || this.fileName;
  }

  onSelectionChange() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    this.specFile = files[0] || undefined;
  }

  enableUpload() {
    return this.fileName !== DEFAULT_FILENAME;
  }

  upload($event: any) {
    console.log('Upload clicked');
    this.sub = this.uploadService.uploadSingleFile(this.specFile).subscribe((percentage: number) => {
      this.uploadProgress = percentage;
      // console.log(`Percentage uploaded: ${percentage}%`);
    });
    this.showProgress = true;
  }

  set showProgress(show: boolean) {
    this._showProgress = show;
  }

  get showProgress(): boolean {
    return this._showProgress;
  }

  cancelUpload() {
    if (this.sub && !this.sub.closed ) { this.sub.unsubscribe(); }
    this.showProgress = false;
  }
}
