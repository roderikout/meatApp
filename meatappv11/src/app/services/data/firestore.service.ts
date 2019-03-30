import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MeatCut } from '../../models/meatCut.interface';
import { Recipes } from '../../models/recipes.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore) { }

  createCut(
    cutName: string,
    recipeList: string[],
    ): Promise<void> {
    const id = this.firestore.createId();

    return this.firestore.doc(`cutList/${id}`).set({
      id,
      cutName,
      recipeList,
    });
  }

  getCutList(): AngularFirestoreCollection<MeatCut> {
    return this.firestore.collection('cutList');
  }

  getRecipeList(): AngularFirestoreCollection<Recipes> {
    return this.firestore.collection('recipeList');
  }
}
