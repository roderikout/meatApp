import { Component, OnInit } from '@angular/core';
import { MeatCut } from 'src/app/models/meatCut.interface';
import { ListsService } from 'src/app/services/lists.service';
import { HelperServiceService } from 'src/app/services/helper-service.service';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Globals } from '../../globals';

@Component({
  providers: [HelperServiceService],
  selector: 'app-cut-detail',
  templateUrl: './cut-detail.page.html',
  styleUrls: ['./cut-detail.page.scss'],
})

export class CutDetailPage implements OnInit {

  cut: MeatCut = {
    id: '',
    cutName: '',
    recipeList: {},
  };

  recipeArray = [];

  cutId = null;
  count: string;
  translationId: string;

  translatedCut: MeatCut = {
    id: '',
    cutName: '',
  };
  translatedCutList = [this.translatedCut];
  translatedObservableCutList: any;

  countryGlob: string;
  cutSelectedGlob: string;

  constructor (private route: ActivatedRoute, private nav: NavController,
    private listsService: ListsService, private loadingController: LoadingController,
    private helperService: HelperServiceService,
    private alertController: AlertController, private globals: Globals,
    ) {
      // this.count = this.globals.country;
    }

  ngOnInit(): void {

  }


  ionViewWillEnter() {
    this.loadStuff();
  }

  loadStuff() {
    this.cutId = this.route.snapshot.params['id'];
    if (this.cutId) {
      this.loadCut();
    }
    this.loadCutSelected();
  }

  async loadCut() {
    const loading = await this.loadingController.create({
      message: 'Loading.....'
    });
    await loading.present();
    this.listsService.getCut(this.cutId).subscribe(res => {
      if (res) {
        loading.dismiss();
        this.cut = res;
        this.globals.cutSelectedTranslationId = this.cut.translationId;
        this.globals.selectedCutCountry = this.cut.country;
        this.globals.selectedCutTranslated = this.cut.cutName;
        this.recipeArray = this.helperService.objToArray(this.cut.recipeList).reverse();
      }
    });
  }

  async loadCutSelected(){
      // this.translatedObservableCutList =
      this.listsService.getTranslatedList().subscribe(res => {
      this.translatedCutList = res;
      this.countryGlob = this.globals.selectedCutCountry;
      this.cutSelectedGlob = this.globals.cutSelectedTranslationId;
    }); 
  }

  async removeRecipeFromCut (index: number) {
    this.recipeArray.splice(index, 1);
    this.saveCutAfterRemove();
  }

  async saveCutAfterRemove () {
    const loading = await this.loadingController.create({
      message: 'Saving.....'
    });
    await loading.present ();
    if (this.recipeArray.length > 0) {
      this.cut.recipeList = this.helperService.arrayToObject(this.recipeArray);
    } else {
      this.presentAlert();
    }
      this.listsService.updateCut(this.cut, this.cutId).then(() => {
        loading.dismiss();
        // this.nav.navigateForward(`/cut-detail/${this.cutId}`);
        this.nav.navigateForward('/cut-list');
      });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta!',
      subHeader: 'Borrar corte',
      message: 'Borrar la última receta borrará el corte',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
      },
      {
        text: 'Ok',
        handler: () => {
          this.listsService.removeCut(this.cutId);
        }
      }
      ]
    });

    await alert.present();
  }

  languageSelected(count: string) {
    this.listsService.changeCountrySelected(count);
    // this.translatedObservableCutList.unsubscribe();
    this.loadStuff();
    this.goToCountryPage();
  }

  goToCountryPage(){
    this.nav.navigateForward('/country-page');
  }
}
