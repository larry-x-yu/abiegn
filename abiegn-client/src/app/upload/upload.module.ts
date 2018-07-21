
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { UploadRoutingModule } from './upload-routing.module';
import { UploadComponent } from './upload.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    UploadRoutingModule
  ],
  declarations: [
    UploadComponent
  ]
})
export class UploadModule { }
