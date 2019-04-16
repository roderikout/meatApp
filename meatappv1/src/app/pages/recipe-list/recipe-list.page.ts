import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.interface';
import { ListsService } from '../../services/lists.service';
import { Globals } from '../../globals';

@Component({
  providers: [ListsService],
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.page.html',
  styleUrls: ['./recipe-list.page.scss'],
})
export class RecipeListPage implements OnInit {
  recipeList: Recipe[];
  count: string;

  constructor(private listsService: ListsService, private globals: Globals) {
    this.count = this.globals.country;
   }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listsService.getRecipeList().subscribe(res => {
      this.recipeList = res;
    });
  }

}
