import { Component, OnInit } from '@angular/core';
import { MeatCut } from 'src/app/models/meatCut.interface';
import { Recipe } from 'src/app/models/recipe.interface';
import { ListsService } from 'src/app/services/lists.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { HelperServiceService } from 'src/app/services/helper-service.service';

@Component({
  providers: [HelperServiceService],
  selector: 'app-cut-detail-edit',
  templateUrl: './cut-detail-edit.page.html',
  styleUrls: ['./cut-detail-edit.page.scss'],
})
export class CutDetailEditPage implements OnInit {

  recipeCSV = '';
  cutName = '';
  cut: MeatCut = {
    id: '',
    cutName: '',
    recipeList: {},
  };

  cutId = null;

  constructor (private route: ActivatedRoute, private nav: NavController,
    private listsService: ListsService, private loadingController: LoadingController,
    private firestore: AngularFirestore, private helperService: HelperServiceService) {}

  ngOnInit() {
    this.cutId = this.route.snapshot.params['id'];
    if (this.cutId) {
      this.loadCut();
    }
  }

  // App functions
  async loadCut() {
    const loading = await this.loadingController.create({
      message: 'Loading.....'
    });
    await loading.present();
    this.listsService.getCut(this.cutId).subscribe(res => {
      loading.dismiss();
      this.cut = res;
      this.recipeCSV = this.helperService.arrayToCsv(this.helperService.objToArray(this.cut.recipeList));
      this.cutName = this.helperService.titleCase(this.cut.cutName);
    });
  }

  async saveCut() {
    const loading = await this.loadingController.create({
      message: 'Saving.....'
    });
    await loading.present();

    // Si es un corte existente, (si vengo de cutList), guardar los cambios sin crear un nuevo ID
    if (this.cutId) {
      this.cut.recipeList = this.helperService.csvToObject(this.recipeCSV);
      this.cut.cutName = this.helperService.titleCase(this.cutName);
      this.listsService.updateCut(this.cut, this.cutId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/cut-list');
      });
    } else { // Si el corte no existe, (si vengo de add), crear un nuevo id y guardar todo
      this.cut.id = this.firestore.createId();
      this.cut.recipeList = this.helperService.csvToObject(this.recipeCSV);
      this.cut.cutName = this.helperService.titleCase(this.cutName);
      this.listsService.addCut(this.cut.cutName, this.cut.recipeList).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/cut-list');
      });
    }
  }

  onRemove(id: string) {
    this.listsService.removeCut(id);
  }

}
