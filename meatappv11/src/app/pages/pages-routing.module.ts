import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from '../home/home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children:
      [
        {
          path: 'cut-list',
          children:
            [
              {
                path: '',
                loadChildren: '../pages/cut-list/cut-list.module#CutListPageModule'
              },
              {
                path: 'cut-detail',
                loadChildren: '../pages/cut-detail/cut-detail.module#CutDetailPageModule'
              }
            ]
        },
        {
          path: 'recipe-list',
          children:
            [
              {
                path: '',
                loadChildren: '../pages/recipe-list/recipe-list.module#RecipeListPageModule'
              }
            ]
        },
        {
          path: '',
          redirectTo: 'home/cut-list',
          pathMatch: 'full'
        }
      ]
  },
  {
    path: '',
    redirectTo: 'home/cut-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports:
    [
      RouterModule.forChild(routes)
    ],
  exports:
    [
      RouterModule
    ]
})
export class PagesRoutingModule {}