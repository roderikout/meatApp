import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/data/firestore.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.page.html',
  styleUrls: ['./recipe-list.page.scss'],
})
export class RecipeListPage implements OnInit {
  public recipeList;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.recipeList = this.firestoreService.getRecipeList().valueChanges();
    /* this.listsService.getCutList().subscribe(res => {
      console.log('Lista de cortes', res);
    }); */
  }
}