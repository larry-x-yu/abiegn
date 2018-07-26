import { CarandorderService } from './../util/carandorder.service';
import { ClarityModule } from '@clr/angular';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AutoConfigRoutingModule } from './auto-config-routing.module';
import { AutoConfigComponent } from './auto-config.component';
import { UploadService } from '@app/util/upload.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    AutoConfigRoutingModule,
    ClarityModule
  ],
  declarations: [
    AutoConfigComponent
  ],
  providers: [
    UploadService,
    CarandorderService
  ]
})
export class AutoConfigModule { }
