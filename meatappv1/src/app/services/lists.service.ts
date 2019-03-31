import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MeatCut } from '../models/meatCut.interface';
import { Recipe } from '../models/recipe.interface';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  private cutCollection: AngularFirestoreCollection<MeatCut>;
  private recipeCollection: AngularFirestoreCollection<Recipe>;
  private cutList: Observable<MeatCut[]>;
  private recipeList: Observable<Recipe[]>;

  constructor(private db: AngularFirestore) {
    this.cutCollection = db.collection<MeatCut>('cutList');
    this.recipeCollection = db.collection<Recipe>('recipeList');

    this.cutList = this.cutCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    ));

    this.recipeList = this.recipeCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    ));

  }

  getCutList() {
    return this.cutList;
  }

  getRecipeList() {
    return this.recipeList;
  }

  getCut(id: string) {
    return this.cutCollection.doc<MeatCut>(id).valueChanges();
  }

  getRecipe(id: string) {
    return this.recipeCollection.doc<Recipe>(id).valueChanges();
  }

  updateCut(cut: MeatCut, id: string) {
    return this.cutCollection.doc(id).update(cut);
  }

  updateRecipe(recipe: Recipe, id: string) {
    return this.recipeCollection.doc(id).update(recipe);
  }

  addCut(cutName: string, recipeList: object): Promise<void> {
    const id = this.db.createId();
    return this.db.doc(`cutList/${id}`).set({
      id,
      cutName,
      recipeList,
    });
  }

  addRecipe(recipeName: string, cutList: object): Promise<void> {
    const id = this.db.createId();
    return this.db.doc(`recipeList/${id}`).set({
      id,
      recipeName,
      cutList,
    });
  }

  removeCut(id: string) {
    return this.cutCollection.doc(id).delete();
  }

  removeRecipe(id: string) {
    return this.recipeCollection.doc(id).delete();
  }
}
