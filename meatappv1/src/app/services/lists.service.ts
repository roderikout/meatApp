import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MeatCut } from '../models/meatCut.interface';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  private cutCollection: AngularFirestoreCollection<MeatCut>;
  private cutList: Observable<MeatCut[]>;

  constructor(private db: AngularFirestore) {
    this.cutCollection = db.collection<MeatCut>('cutList');
    this.cutList = this.cutCollection.snapshotChanges().pipe(map(
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

  getCut(id: string) {
    return this.cutCollection.doc<MeatCut>(id).valueChanges();
  }

  updateCut(cut: MeatCut, id: string) {
    return this.cutCollection.doc(id).update(cut);
  }

  addCut(cutName: string, recipeList: object): Promise<void> {
    const id = this.db.createId();
    return this.db.doc(`cutList/${id}`).set({
      id,
      cutName,
      recipeList,
    });
  }

  removeCut(id: string) {
    return this.cutCollection.doc(id).delete();
  }
}
