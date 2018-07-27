import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadService } from '@app/util/upload.service';
import { Wait } from '../util/Wait';
import { CarandorderService } from '@app/util/carandorder.service';
import { Router } from '@angular/router';

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
  progressMessage = '';

  constructor(private uploadService: UploadService, private carandorder: CarandorderService, private router: Router) { }

  ngOnInit() {
  }

  onFileChosen(e: any) {
    this.fileName = e.target.value || this.fileName;
  }

  onSelectionChange(e: any) {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    this.specFile = files[0] || undefined;
  }

  enableUpload() {
    return this.fileName !== DEFAULT_FILENAME;
  }

  upload($event: any) {

    this.showProgress = true;
    const wait: Wait = new Wait(1000);

    this.progressMessage = 'Uploading your configuration...';
    this.sub = this.uploadService.uploadSingleFile(this.specFile).subscribe(async (res: any) => {
      if (Number.isInteger(res) && res === 100) {
        this.progressMessage = 'Parsing your configuration...';
      } else if (!Number.isInteger(res)) {
        this.carandorder.parsedConfiguration = res;
        await wait.start();
        this.showProgress = false;
        this.router.navigateByUrl('/autoconfig');
      }
    });
  }

  set showProgress(show: boolean) {
    this._showProgress = show;
  }

  get showProgress(): boolean {
    return this._showProgress;
  }

  cancelUpload() {
    if (this.sub && !this.sub.closed) { this.sub.unsubscribe(); }
    this.showProgress = false;
  }
}
