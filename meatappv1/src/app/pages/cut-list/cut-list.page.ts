import { Component, OnInit } from '@angular/core';
import { MeatCut } from '../../models/meatCut.interface';
import { ListsService } from '../../services/lists.service';
import { Globals } from '../../globals';

@Component({
  providers: [ListsService],
  selector: 'app-cut-list',
  templateUrl: './cut-list.page.html',
  styleUrls: ['./cut-list.page.scss'],
})
export class CutListPage implements OnInit {
  cutList: MeatCut[];
  count: string;
  tId: string;

  constructor(private listsService: ListsService, private globals: Globals) {
    this.count = this.globals.country;
  }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.listsService.getCutList().subscribe(res => {
      this.cutList = res;
    });
  }
}
