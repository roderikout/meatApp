import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.interface';
import { ListsService } from 'src/app/services/lists.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-recipe-detail-edit',
  templateUrl: './recipe-detail-edit.page.html',
  styleUrls: ['./recipe-detail-edit.page.scss'],
})
export class RecipeDetailEditPage implements OnInit {
  cutCSV = '';
  cutObject = {};
  recipe: Recipe = {
    id: '',
    recipeName: '',
    cutList: {},
  };

  recipeId = null;

  constructor (private route: ActivatedRoute, private nav: NavController,
    private listsService: ListsService, private loadingController: LoadingController,
    private firestore: AngularFirestore) {}

  ngOnInit() {
    this.recipeId = this.route.snapshot.params['id'];
    if (this.recipeId) {
      this.loadRecipe();
    }
  }

  toArray(csvString: string): string[] {
    return csvString.split(',');
  }

  objToArray(object: object): string[] {
    let keys = [];
    for (let k in object) {
      keys.push(k);
    };
    return keys;
  }

  toObject(csvValue: string): object {
    const newObject = {};
    const newArray: string[] = this.toArray(csvValue);
    for (let k in newArray){
      let name: string = newArray[k];
      newObject[name] = true;
    }
    return newObject;
  }

  toCSV(arrayValue: string[]): string {
    let csv = '';
    return csv = arrayValue.join(', ');
  }

  async loadRecipe() {
    const loading = await this.loadingController.create({
      message: 'Loading.....'
    });
    await loading.present();
    this.listsService.getRecipe(this.recipeId).subscribe(res => {
      loading.dismiss();
      this.recipe = res;
      this.cutCSV = this.toCSV(this.objToArray(this.recipe.cutList));
    });
  }


  async saveRecipe() {
    const loading = await this.loadingController.create({
      message: 'Saving.....'
    });
    await loading.present();

    if (this.recipeId) {
      this.recipe.cutList = this.toObject(this.cutCSV);
      this.listsService.updateRecipe(this.recipe, this.recipeId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/recipe-list');
      });
    } else {
      this.recipe.id = this.firestore.createId();
      this.recipe.cutList = this.toObject(this.cutCSV);
      this.listsService.addRecipe(this.recipe.recipeName, this.recipe.cutList).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/recipe-list');
      });
    }
  }

  onRemove(id: string) {
    this.listsService.removeRecipe(id);
  }

}
