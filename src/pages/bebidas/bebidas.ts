import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Bebida } from '../../commons/bebida';


@Component({
  selector: 'page-home',
  templateUrl: 'bebidas.html',
})
export class BebidasPage {
  private itemsCollection: AngularFirestoreCollection<Bebida>;

  bebidas: Observable<Bebida[]>;

  constructor(
    private readonly afs: AngularFirestore) {


    this.itemsCollection = afs.collection<Bebida>('Bebidas');
    this.bebidas = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Bebida;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
}
