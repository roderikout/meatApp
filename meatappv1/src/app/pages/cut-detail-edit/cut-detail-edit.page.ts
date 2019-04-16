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
import { Alert } from 'selenium-webdriver';

@Component({
  providers: [HelperServiceService],
  selector: 'app-cut-detail-edit',
  templateUrl: './cut-detail-edit.page.html',
  styleUrls: ['./cut-detail-edit.page.scss'],
})
export class CutDetailEditPage implements OnInit {
  recipeForm = new FormControl();
  options: Recipe[] = [];
  newRecipe: string;
  filteredOptions: Observable<Recipe[]>;

  recipeCSV = '';
  recipeObject = {};
  cutName = '';
  cut: MeatCut = {
    id: '',
    cutName: '',
    recipeList: {},
  };

  cutId = null;
  newId = null;

  constructor ( private route: ActivatedRoute, private nav: NavController,
    private listsService: ListsService, private loadingController: LoadingController,
    private firestore: AngularFirestore, private helperService: HelperServiceService, 
    private alertController: AlertController,
    ) {}

    ngOnInit(): void {
    }

    ionViewWillEnter() {
    this.cutId = this.route.snapshot.params['id'];
    if (this.cutId) {
      this.loadCut();
    }

    this.listsService.getRecipeList().subscribe(res => {
      this.options = res;
    });

    this.filteredOptions = this.recipeForm.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  // App functions
  async loadCut() {
    const loading = await this.loadingController.create({
      message: 'Loading.....'
    });
    await loading.present();
    this.listsService.getCut(this.cutId).subscribe(res => {
      loading.dismiss();
      if (res) {
        this.cut = res;
        this.recipeCSV = this.helperService.arrayToCsv(this.helperService.objToArray(this.cut.recipeList).reverse());
        this.cutName = this.helperService.titleCase(this.cut.cutName);
      }
    });
  }

  async saveCut() {
    const loading = await this.loadingController.create({
      message: 'Saving.....'
    });
    await loading.present();

    // Si es un corte existente, (si vengo de cutList), guardar los cambios sin crear un nuevo ID
    if (this.cutId) {
      this.newRecipe = this.newRecipe.trim();
      console.log('-' + this.newRecipe + '-');
      if (this.newRecipe.length > 0) {
        this.recipeCSV = this.recipeCSV + ', ' + this.newRecipe;
        this.cut.recipeList = this.helperService.csvToObjectCuts(this.recipeCSV);
        this.listsService.updateCut(this.cut, this.cutId).then(() => {
          loading.dismiss();
          // this.nav.navigateForward(`/cut-detail/${this.cutId}`);
          this.nav.navigateForward('/cut-list');
        });
      } else {
        loading.dismiss();
        this.nav.navigateForward('/cut-list');
      }
    } else {
      if (this.newRecipe.length > 0) {
        this.newId = this.firestore.createId();
        this.recipeCSV = this.newRecipe;
        this.cut.recipeList = this.helperService.csvToObjectCuts(this.recipeCSV);
        this.listsService.addCut(this.cut.cutName, this.cut.recipeList, this.newId).then(() => {
          loading.dismiss();
          // this.nav.navigateForward(`/recipe-detail/${this.recipeId}`);
          this.nav.navigateForward('/cut-list');
        });
      } else {
        loading.dismiss();
        this.nav.navigateForward('/cut-list');
      }
    }
  }

  onRemove(id: string) {
    this.listsService.removeCut(id);
  }

  private _filter(value: string): Recipe[] {
    value ? this.newRecipe = value : this.newRecipe = '';
    return this.options.filter(option => option.recipeName.includes(value));
  }

  async presentAlert(cutId: string) {
    if (cutId) {
      const alert = await this.alertController.create({
        header: 'Alerta!',
        subHeader: 'Borrar corte',
        message: '¿Realmente deseas borrar este corte?',
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Ok',
          handler: () => {
            this.onRemove(cutId);
          }
        }
        ]
      });

      await alert.present();
    }
  }
}
