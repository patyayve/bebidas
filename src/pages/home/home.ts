import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';  
import { map } from 'rxjs/operators';
import { Platillo} from '../../commons/platillo';
import { BebidasPage } from '../bebidas/bebidas';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private itemsCollection: AngularFirestoreCollection<Platillo>;

  platillos: Observable<Platillo[]>;

  constructor(private readonly afs: AngularFirestore,
    private navCTRL: NavController) {

                this.itemsCollection = afs.collection<Platillo>('platillos');
                this.platillos = this.itemsCollection.snapshotChanges().pipe(
                  map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Platillo;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                  }))
                );   
  }
  verBebidas(){
    this.navCTRL.push(BebidasPage);
  }

}
