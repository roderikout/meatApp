import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.interface';
import { ListsService } from '../../services/lists.service';

@Component({
  providers: [ListsService],
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.page.html',
  styleUrls: ['./recipe-list.page.scss'],
})
export class RecipeListPage implements OnInit {
  recipeList: Recipe[];

  constructor(private listsService: ListsService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listsService.getRecipeList().subscribe(res => {
      this.recipeList = res;
      // console.log('Lista de cortes ', this.cutList);
    });
  }

}
