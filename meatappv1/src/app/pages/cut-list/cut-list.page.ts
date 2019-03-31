import { Component, OnInit } from '@angular/core';
import { MeatCut } from '../../models/meatCut.interface';
import { ListsService } from '../../services/lists.service';

@Component({
  providers: [ListsService],
  selector: 'app-cut-list',
  templateUrl: './cut-list.page.html',
  styleUrls: ['./cut-list.page.scss'],
})
export class CutListPage implements OnInit {
  cutList: MeatCut[];

  constructor(private listsService: ListsService) {}

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.listsService.getCutList().subscribe(res => {
      this.cutList = res;
    });
  }
}
