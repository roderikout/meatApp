import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RecipeDetailEditPage } from './recipe-detail-edit.page';

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
    RouterModule.forChild(routes)
  ],
  declarations: [RecipeDetailEditPage]
})
export class RecipeDetailEditPageModule {}
