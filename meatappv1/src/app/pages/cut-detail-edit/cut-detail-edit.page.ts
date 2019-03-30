import { Component, OnInit } from '@angular/core';
import { MeatCut } from 'src/app/models/meatCut.interface';
import { ListsService } from 'src/app/services/lists.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-cut-detail-edit',
  templateUrl: './cut-detail-edit.page.html',
  styleUrls: ['./cut-detail-edit.page.scss'],
})
export class CutDetailEditPage implements OnInit {

  cut: MeatCut = {
    id: '',
    cutName: '',
    recipeList: '',
  };

  cutId = null;

  constructor (private route: ActivatedRoute, private nav: NavController,
    private listsService: ListsService, private loadingController: LoadingController,
    private firestore: AngularFirestore) {}

  ngOnInit() {
    this.cutId = this.route.snapshot.params['id'];
    if (this.cutId) {
      this.loadCut();
    }
  }
  async loadCut() {
    const loading = await this.loadingController.create({
      message: 'Loading.....'
    });
    await loading.present();
    this.listsService.getCut(this.cutId).subscribe(res => {
      loading.dismiss();
      this.cut = res;
    });
  }

  async saveCut() {
    const loading = await this.loadingController.create({
      message: 'Saving.....'
    });
    await loading.present();

    if (this.cutId) {
      this.listsService.updateCut(this.cut, this.cutId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/cut-list');
      });
    } else {
      this.cut.id = this.firestore.createId();
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
