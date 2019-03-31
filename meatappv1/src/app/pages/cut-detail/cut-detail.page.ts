import { Component, OnInit } from '@angular/core';
import { MeatCut } from 'src/app/models/meatCut.interface';
import { ListsService } from 'src/app/services/lists.service';
import { HelperServiceService } from 'src/app/services/helper-service.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

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

  constructor (private route: ActivatedRoute, private nav: NavController,
    private listsService: ListsService, private loadingController: LoadingController,
    private helperService: HelperServiceService,
    ) {}

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
      this.recipeArray = this.helperService.objToArray(this.cut.recipeList);
    });
  }
}
