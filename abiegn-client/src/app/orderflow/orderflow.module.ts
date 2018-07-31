import { AutoConfigComponent } from './wizard-steps/auto-config/auto-config.component';
import { UploadComponent } from './wizard-steps/upload/upload.component';
import { ArchwizardModule } from 'angular-archwizard';
import { CarandorderService } from './../util/carandorder.service';
import { ClarityModule } from '@clr/angular';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { OrderflowRoutingModule } from './orderflow-routing.module';
import { OrderflowComponent } from './orderflow.component';
import { UploadService } from '@app/util/upload.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    OrderflowRoutingModule,
    ClarityModule,
    ArchwizardModule
  ],
  declarations: [
    OrderflowComponent,
    UploadComponent,
    AutoConfigComponent
  ],
  providers: [
    UploadService,
    CarandorderService
  ]
})
export class OrderflowModule { }
