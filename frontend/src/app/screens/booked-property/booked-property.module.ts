import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookedPropertyPageRoutingModule } from './booked-property-routing.module';

import { BookedPropertyPage } from './booked-property.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookedPropertyPageRoutingModule
  ],
  declarations: [BookedPropertyPage]
})
export class BookedPropertyPageModule {}
