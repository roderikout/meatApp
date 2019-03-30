import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CutDetailEditPage } from './cut-detail-edit.page';

const routes: Routes = [
  {
    path: '',
    component: CutDetailEditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CutDetailEditPage]
})
export class CutDetailEditPageModule {}
