import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadService } from '@app/util/upload.service';

import * as io from 'socket.io-client';

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

  constructor(private uploadService: UploadService) { }

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
    // const socket = io('https://localhost:8443', {path: '/socket'});

    // if (socket) {
    //   socket.connect();
    // }
    this.progressMessage = 'Uploading your configuration...';
    this.sub = this.uploadService.uploadSingleFile(this.specFile).subscribe((percentage: number) => {
      this.uploadProgress = percentage;
      // console.log(`Percentage uploaded: ${percentage}%`);
      if (percentage === 100) {
        this.progressMessage = 'Parsing your configuration...';
      }
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
    if (this.sub && !this.sub.closed) { this.sub.unsubscribe(); }
    this.showProgress = false;
  }
}
