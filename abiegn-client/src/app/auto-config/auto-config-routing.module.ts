import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { AutoConfigComponent } from './auto-config.component';

const routes: Routes = [
  Route.withShell([
    { path: 'autoconfig', component: AutoConfigComponent, data: { title: extract('My Car') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AutoConfigRoutingModule { }
