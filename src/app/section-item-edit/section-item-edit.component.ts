import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-section-item-edit',
  templateUrl: './section-item-edit.component.html',
  styleUrls: ['./section-item-edit.component.scss']
})
export class SectionItemEditComponent implements OnInit {
  downloadURL: Observable<string>;
  item: Observable<any[]>
  tmp: string;
  thisSection;
  chng: boolean;
  constructor(private storage: AngularFireStorage, public ad: AngularFirestore, public r: Router, route: ActivatedRoute) {
    route.params.subscribe(res => {
      this.thisSection = res.section;
      this.item = this.ad.collection('items', ref => ref.where('url', '==', res.item)).valueChanges({ idField: 'idEvent' });
    });
  }


  saveData(i) {

    if (this.chng === true) {
      console.log('change ', true);
      this.storage.ref(this.tmp).getDownloadURL().subscribe(z => {
        if (z) {
          this.ad.collection('items').doc(i.idEvent)
            .update(
              {
                name: i.name,
                image: z,
                short_desc: i.short_desc,
                url: i.url,
                price: i.price,
                min_order: i.min_order,
                status: i.status,
              }
            ).then(x => {
              console.log("data", x);
              this.r.navigate(['/sections/' + this.thisSection]);
            })
        }
      })
    } else {
      console.log('change ', false);

      this.ad.collection('items').doc(i.idEvent)
        .update(
          {
            name: i.name,
            short_desc: i.short_desc,
            url: i.url,
            price: i.price,
            min_order: i.min_order,
            status: i.status,
          }
        ).then(x => {
          console.log("data", x);
          this.r.navigate(['/sections/' + this.thisSection]);
        })
    }



  }


  uploadFile(event) {

    const file = event.target.files[0];
    const filePath = "s/s" + Math.floor(Math.random() * (999999 - 100000)) + 100000;
    this.tmp = filePath;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.chng = true;
    // observe percentage changes
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL())
    )
      .subscribe()
  }
  ngOnInit(): void {
  }

}
