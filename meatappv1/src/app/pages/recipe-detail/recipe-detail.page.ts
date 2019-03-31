import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.interface';
import { ListsService } from 'src/app/services/lists.service';
import { HelperServiceService } from 'src/app/services/helper-service.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  providers: [HelperServiceService],
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  recipe: Recipe = {
    id: '',
    recipeName: '',
    cutList: {},
  };

  cutArray = [];
  recipeId = null;

/*   objToArray(object: object): string[] {
    let keys = [];
    for (let k in object) {
      keys.push(k);
    };
    return keys;
  } */

  constructor (private route: ActivatedRoute, private nav: NavController,
    private listsService: ListsService, private loadingController: LoadingController,
    private helperService: HelperServiceService,
    ) {}

  ngOnInit() {
    this.recipeId = this.route.snapshot.params['id'];
    if (this.recipeId) {
      this.loadRecipe();
    }
  }

  async loadRecipe() {
    const loading = await this.loadingController.create({
      message: 'Loading.....'
    });
    await loading.present();
    this.listsService.getRecipe(this.recipeId).subscribe(res => {
      loading.dismiss();
      this.recipe = res;
      this.cutArray = this.helperService.objToArray(this.recipe.cutList);
    });
  }

}
