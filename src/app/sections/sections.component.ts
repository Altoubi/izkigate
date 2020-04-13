import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {

  sections: Observable<any[]>
  constructor(public db: AngularFirestore) { 
    this.sections = db.collection('sections').valueChanges({ idField: 'eventId' });
  }

  del(x) {
    this.db.collection('sections').doc(x).delete().then();
  }
  ngOnInit(): void {
  }

}
