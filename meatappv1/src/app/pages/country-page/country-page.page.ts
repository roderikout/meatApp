import { Component, OnInit } from '@angular/core';
import { MeatCut } from '../../models/meatCut.interface';
import { ListsService } from '../../services/lists.service';
import { Globals } from '../../globals';

@Component({
  providers: [ListsService],
  selector: 'app-country-page',
  templateUrl: './country-page.page.html',
  styleUrls: ['./country-page.page.scss'],
})
export class CountryPagePage implements OnInit {
  count: string;
  cutSelectedTranslate: string;
  translatedCutList: MeatCut[];
  translatedCut: MeatCut = {
    id: '',
    cutName: '',
  };

  constructor(private listsService: ListsService, private globals: Globals) {
    this.count = this.globals.selectedCutCountry;
    this.cutSelectedTranslate = this.globals.selectedCutTranslated;
  }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.listsService.getTranslatedList().subscribe(res => {
      this.translatedCutList = res;
      this.translatedCut = this.translatedCutList[0];
    });
  }
}

