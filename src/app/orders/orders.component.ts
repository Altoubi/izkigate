import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  newOrder: Observable<any[]>;
  workOrder: Observable<any[]>;
  doneOrder: Observable<any[]>;
  trushOrder: Observable<any[]>;
  constructor(public db: AngularFirestore) { 
    this.newOrder = db.collection('orders', ref => ref.where('compleated', '==', "new")).valueChanges({ idField: 'idEvent' });
    this.workOrder = db.collection('orders', ref => ref.where('compleated', '==', "work")).valueChanges({ idField: 'idEvent' });
    this.doneOrder = db.collection('orders', ref => ref.where('compleated', '==', "done")).valueChanges({ idField: 'idEvent' });
    this.trushOrder = db.collection('orders', ref => ref.where('compleated', '==', "deleted")).valueChanges({ idField: 'idEvent' });

  }

  changeStatus (id,st){

    console.log("data" + id )
    console.log("st" + st )
    this.db.collection('orders').doc(id).update({
      compleated: st
    }).then();
  }
  delete (id){
    this.db.collection('orders').doc(id).delete().then();
  }

  ngOnInit(): void {
  }

}
