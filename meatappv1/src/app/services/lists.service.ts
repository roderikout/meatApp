import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MeatCut } from '../models/meatCut.interface';
import { Recipe } from '../models/recipe.interface';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  private cutCollection: AngularFirestoreCollection<MeatCut>;
  private cutTranslationCollection: AngularFirestoreCollection<MeatCut>;
  private recipeCollection: AngularFirestoreCollection<Recipe>;
  private cutList: Observable<MeatCut[]>;
  private recipeList: Observable<Recipe[]>;
  private translatedCutList: Observable<any>;

  constructor(private db: AngularFirestore, private globals: Globals) {

    this.cutCollection = db.collection<MeatCut>('cutList',
                          ref => ref.where('country', '==', this.globals.country));

    this.lookForNewTranslatedList(db);

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

    this.translatedCutList = this.cutTranslationCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    ));
  }

  changeCountry(count: string) {
    this.globals.country = count;
  }

  changeCountrySelected(count: string) {
    this.globals.selectedCutCountry = count;
  }

  getCutList() {
    return this.cutList;
  }

  getRecipeList() {
    return this.recipeList;
  }

  lookForNewTranslatedList(db: AngularFirestore) {
    if (this.globals.cutSelectedTranslationId) {
      this.cutTranslationCollection = db.collection<MeatCut>('cutList',
                  ref => ref.where('translationId', '==', this.globals.cutSelectedTranslationId)
                 .where('country', '==', this.globals.selectedCutCountry));
    }
  }

  getTranslatedList() {
    this.lookForNewTranslatedList(this.db);
    return this.translatedCutList;
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

  addCut(cutName: string, recipeList: object, cutId?: string): Promise<void> {
    let id = null;
    !cutId ? id = this.db.createId() : id = cutId;

    return this.db.doc(`cutList/${id}`).set({
      id,
      cutName,
      recipeList,
    });
  }

  addRecipe(recipeName: string, cutList: object, recipeId?: string): Promise<void> {
    let id = null;
    !recipeId ? id = this.db.createId() : id = recipeId;

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
