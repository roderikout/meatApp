import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CutDetailEditPage } from './cut-detail-edit.page';
import { MaterialModule } from 'src/app/material/material.module';

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
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
  declarations: [CutDetailEditPage]
})
export class CutDetailEditPageModule {}
