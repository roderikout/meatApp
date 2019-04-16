import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RecipeDetailEditPage } from './recipe-detail-edit.page';
import { MaterialModule } from 'src/app/material/material.module';

const routes: Routes = [
  {
    path: '',
    component: RecipeDetailEditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RecipeDetailEditPage]
})
export class RecipeDetailEditPageModule {}
