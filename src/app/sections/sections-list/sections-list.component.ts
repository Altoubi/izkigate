import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sections-list',
  templateUrl: './sections-list.component.html',
  styleUrls: ['./sections-list.component.scss']
})
export class SectionsListComponent implements OnInit {

  sectionData : Observable<any>
  items : Observable<any[]>
  thisSection;
    constructor(public db: AngularFirestore, private route: ActivatedRoute) { 
      this.route.params.subscribe(res => {
        this.thisSection = res.section;
        this.sectionData = db.collection('sections').doc(res.section).valueChanges();
        this.items = db.collection('items', ref => ref.where('section_url', '==', res.section)).valueChanges({ idField: 'eventId' });
      
    });
  }

  del(x) {
    this.db.collection('items').doc(x).delete().then();
  }

  ngOnInit(): void {
  }

}
