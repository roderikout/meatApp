import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.interface';
import { MeatCut } from 'src/app/models/meatCut.interface';
import { ListsService } from 'src/app/services/lists.service';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { HelperServiceService } from 'src/app/services/helper-service.service';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  providers: [HelperServiceService],
  selector: 'app-recipe-detail-edit',
  templateUrl: './recipe-detail-edit.page.html',
  styleUrls: ['./recipe-detail-edit.page.scss'],
})
export class RecipeDetailEditPage implements OnInit {
  cutsForm = new FormControl();
  options: MeatCut[] = [];
  newCut: string;
  filteredOptions: Observable<MeatCut[]>;

  cutCSV = '';
  cutObject = {};
  recipeName = '';
  recipe: Recipe = {
    id: '',
    recipeName: '',
    cutList: {},
  };

  recipeId = null;
  newId = null;

  constructor(private route: ActivatedRoute, private nav: NavController,
    private listsService: ListsService, private loadingController: LoadingController,
    private firestore: AngularFirestore, private helperService: HelperServiceService,
    private alertController: AlertController,
    ) { }

  ngOnInit(): void {
  }

  ionViewWillEnter() {
    this.recipeId = this.route.snapshot.params['id'];
    if (this.recipeId) {
      this.loadRecipe();
    }

    this.listsService.getCutList().subscribe(res => {
      this.options = res;
    });

    this.filteredOptions = this.cutsForm.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
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
        this.cutCSV = this.helperService.arrayToCsv(this.helperService.objToArray(this.recipe.cutList).reverse());
        this.recipeName = this.helperService.titleCase(this.recipe.recipeName);
      }
    });
  }


  async saveRecipe() {
    const loading = await this.loadingController.create({
      message: 'Saving.....'
    });
    await loading.present();

    if (this.recipeId) {
      this.newCut = this.newCut.trim();
      console.log('-' + this.newCut + '-');
      if (this.newCut.length > 0) {
        this.cutCSV = this.cutCSV + ', ' + this.newCut;
        this.recipe.cutList = this.helperService.csvToObjectCuts(this.cutCSV);
        this.listsService.updateRecipe(this.recipe, this.recipeId).then(() => {
          loading.dismiss();
          // this.nav.navigateForward(`/recipe-detail/${this.recipeId}`);
          this.nav.navigateForward('/recipe-list');
        });
      } else {
        loading.dismiss();
        this.nav.navigateForward('/recipe-list');
      }
    } else {
      if (this.newCut.length > 0) {
        this.newId = this.firestore.createId();
        this.cutCSV = this.newCut;
        this.recipe.cutList = this.helperService.csvToObjectCuts(this.cutCSV);
        this.listsService.addRecipe(this.recipe.recipeName, this.recipe.cutList, this.newId).then(() => {
          loading.dismiss();
          // this.nav.navigateForward(`/recipe-detail/${this.recipeId}`);
          this.nav.navigateForward('/recipe-list');
        });
      } else {
        loading.dismiss();
        this.nav.navigateForward('/recipe-list');
      }
    }
  }

  onRemove(id: string) {
    this.listsService.removeRecipe(id);
  }

  private _filter(value: string): MeatCut[] {
    value ? this.newCut = value : this.newCut = '';
    return this.options.filter(option => option.cutName.includes(value));
  }

  async presentAlert(recipeId: string) {
    if (recipeId) {
      const alert = await this.alertController.create({
        header: 'Alerta!',
        subHeader: 'Borrar receta',
        message: '¿Realmente deseas borrar esta receta?',
        buttons: [{
          text: 'Cancel',
          cssClass: 'secondary',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: () => {
            if (recipeId) {
              this.onRemove(recipeId);
            }
          }
        }
        ]
      });

      await alert.present();
    }
  }
}
