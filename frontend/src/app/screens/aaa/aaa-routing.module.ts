import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AaaPage } from './aaa.page';

const routes: Routes = [
  {
    path: '',
    component: AaaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AaaPageRoutingModule {}
