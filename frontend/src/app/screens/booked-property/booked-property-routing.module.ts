import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookedPropertyPage } from './booked-property.page';

const routes: Routes = [
  {
    path: '',
    component: BookedPropertyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookedPropertyPageRoutingModule {}
