import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        /* children: [
          { path: 'cut-list', loadChildren: '../pages/cut-list/cut-list.module#CutListPageModule' },
          { path: 'cut-add', loadChildren: '../pages/cut-add/cut-add.module#CutAddPageModule' },
          { path: 'recipe-list', loadChildren: '../pages/recipe-list/recipe-list.module#RecipeListPageModule' },
          { path: 'recipe-add', loadChildren: '../pages/recipe-add/recipe-add.module#RecipeAddPageModule' },
          { path: 'cut-detail/:id', loadChildren: '../pages/cut-detail/cut-detail.module#CutDetailPageModule' },
          { path: 'recipe-detail/:id', loadChildren: '../pages/recipe-detail/recipe-detail.module#RecipeDetailPageModule'},
        ] */
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
