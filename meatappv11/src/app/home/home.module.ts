import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PagesRoutingModule } from '../pages/pages-routing.module';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagesRoutingModule,
    RouterModule.forChild(routes)
      /* [{
        path: '',
        component: HomePage,
        children: [
          { path: 'start', loadChildren: '../pages/start/start.module#StartPageModule' },
          { path: 'cut-list', loadChildren: '../pages/cut-list/cut-list.module#CutListPageModule' },
          { path: 'cut-add', loadChildren: '../pages/cut-add/cut-add.module#CutAddPageModule' },
          { path: 'recipe-list', loadChildren: '../pages/recipe-list/recipe-list.module#RecipeListPageModule' },
          { path: 'recipe-add', loadChildren: '../pages/recipe-add/recipe-add.module#RecipeAddPageModule' },
          { path: 'cut-detail/:id', loadChildren: '../pages/cut-detail/cut-detail.module#CutDetailPageModule' },
          { path: 'recipe-detail/:id', loadChildren: '../pages/recipe-detail/recipe-detail.module#RecipeDetailPageModule'},
        ]
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
     ]) */
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
