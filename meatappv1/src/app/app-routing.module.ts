import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'cut-list', loadChildren: './pages/cut-list/cut-list.module#CutListPageModule' },
  { path: 'cut-detail/:id', loadChildren: './pages/cut-detail/cut-detail.module#CutDetailPageModule' },
  { path: 'cut-detail', loadChildren: './pages/cut-detail/cut-detail.module#CutDetailPageModule' },
  { path: 'recipe-list', loadChildren: './pages/recipe-list/recipe-list.module#RecipeListPageModule'},
  { path: 'cut-detail-edit', loadChildren: './pages/cut-detail-edit/cut-detail-edit.module#CutDetailEditPageModule' },
  { path: 'cut-detail-edit/:id', loadChildren: './pages/cut-detail-edit/cut-detail-edit.module#CutDetailEditPageModule' },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
