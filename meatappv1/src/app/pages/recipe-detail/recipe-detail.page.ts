import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.interface';
import { ListsService } from 'src/app/services/lists.service';
import { HelperServiceService } from 'src/app/services/helper-service.service';
import { NavController, LoadingController, AlertController, } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Globals } from '../../globals';

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
  count: string;

  constructor (private route: ActivatedRoute, private nav: NavController,
    private listsService: ListsService, private loadingController: LoadingController,
    private helperService: HelperServiceService,
    private alertController: AlertController, private globals: Globals,
    ) {
      this.count = this.globals.country;
    }

  ngOnInit(): void {
  }

  ionViewWillEnter() {
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
      if (res) {
        this.recipe = res;
        this.cutArray = this.helperService.objToArray(this.recipe.cutList).reverse();
      }
    });
  }

  async removeCutFromRecipe(index: number) {
    this.cutArray.splice(index, 1);
    this.saveRecipeAfterRemove();
  }

  async saveRecipeAfterRemove() {
    const loading = await this.loadingController.create({
      message: 'Saving.....'
    });
    await loading.present();
    if (this.cutArray.length > 0) {
      this.recipe.cutList = this.helperService.arrayToObject(this.cutArray);
    } else {
      this.presentAlert();
    }
      this.listsService.updateRecipe(this.recipe, this.recipeId).then(() => {
        loading.dismiss();
        // this.nav.navigateForward(`/recipe-detail/${this.recipeId}`);
        this.nav.navigateForward('/recipe-list');
      });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta!',
      subHeader: 'Borrar receta',
      message: 'Borrar el último corte borrará la receta',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
      },
      {
        text: 'Ok',
        handler: () => {
          this.listsService.removeRecipe(this.recipeId);
        }
      }
      ]
    });

    await alert.present();
  }
}
