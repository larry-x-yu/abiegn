import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { OrderflowComponent } from './orderflow.component';

const routes: Routes = [
  Route.withShell([
    { path: 'order/wizard', component: OrderflowComponent, data: { title: extract('Order My Car') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OrderflowRoutingModule { }
