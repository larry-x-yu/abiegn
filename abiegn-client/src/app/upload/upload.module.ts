
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { UploadRoutingModule } from './upload-routing.module';
import { UploadComponent } from './upload.component';
import { UploadService } from '@app/util/upload.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    UploadRoutingModule
  ],
  declarations: [
    UploadComponent
  ],
  providers: [
    UploadService
  ]
})
export class UploadModule { }
