import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AaaPageRoutingModule } from './aaa-routing.module';

import { AaaPage } from './aaa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AaaPageRoutingModule
  ],
  declarations: [AaaPage]
})
export class AaaPageModule {}
