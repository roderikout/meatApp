import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/data/firestore.service';

@Component({
  providers: [FirestoreService],
  selector: 'app-cut-list',
  templateUrl: './cut-list.page.html',
  styleUrls: ['./cut-list.page.scss'],
})
export class CutListPage implements OnInit {
  public cutList;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    /* this.listsService.getCutList().subscribe(res => {
      console.log('Lista de cortes', res);
    }); */
  }

  ionViewWillEnter() {
    this.cutList = this.firestoreService.getCutList().valueChanges();
  }
}
