import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { UploadComponent } from './upload.component';

const routes: Routes = [
  Route.withShell([
    { path: 'upload', component: UploadComponent, data: { title: extract('Upload') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UploadRoutingModule { }
