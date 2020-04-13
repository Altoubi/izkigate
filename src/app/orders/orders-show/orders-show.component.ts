import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'app-orders-show',
  templateUrl: './orders-show.component.html',
  styleUrls: ['./orders-show.component.scss']
})
export class OrdersShowComponent implements OnInit {
  orders: Observable<any[]>
  items: Observable<any[]>
code:string;
  constructor(public ad: AngularFirestore, public r: Router, route: ActivatedRoute) { 
    route.params.subscribe(res => {
      this.code = res.order;
      this.orders = this.ad.collection('orders', ref => ref.where('code', '==', res.order)).valueChanges({ idField: 'idEvent' });
      this.items = this.ad.collection('orders').doc(res.order).collection('items').valueChanges({ idField: 'idEvent' });
    });
  }
  changeStatus(id, st) {
    
    console.log("data" + id)
    console.log("st" + st)
    this.ad.collection('orders').doc(id).update({
      compleated: st
    }).then();
  }

  selected(id, st) {
    const stb = (st === true) ? false : true;

    console.log("data" + id)
    console.log("st" + st)
    console.log("stvvv" + stb)
   
    this.ad.collection('orders').doc(this.code).collection('items').doc(id).update({
      selected: stb
    }).then();
  }
  ngOnInit(): void {
  }

}
