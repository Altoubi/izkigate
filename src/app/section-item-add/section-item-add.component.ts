import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-section-item-add',
  templateUrl: './section-item-add.component.html',
  styleUrls: ['./section-item-add.component.scss']
})
export class SectionItemAddComponent implements OnInit {


  downloadURL: Observable<string>;
  i = { name: '', url: 0, image: '', short_desc: '', min_order:'1', price:'', status:'متوفر' };

  tmp: string;
  thisSection;
  // chng: boolean;
  constructor(private storage: AngularFireStorage, public ad: AngularFirestore, public r: Router, route: ActivatedRoute) {
    route.params.subscribe(res => {
      const filePath = Math.floor(Math.random() * (9999999999 - 1000000000)) + 1000000000;
      this.i.url = filePath;
      this.thisSection = res.section;
    });
  }


  saveData(i) {

   
      this.storage.ref(this.tmp).getDownloadURL().subscribe(z => {
        if (z) {
          this.ad.collection('items').add(
              {
                name: i.name,
                image: z,
                short_desc: i.short_desc,
                url: i.url,
                price: i.price,
                min_order: i.min_order,
                status: i.status,
                section_url: this.thisSection,
              }
            ).then(x => {
              console.log("data", x);
              this.r.navigate(['/sections/' + this.thisSection]);
            })
        }
      })
   



  }


  uploadFile(event) {

    const file = event.target.files[0];
    const filePath = "s/s" + Math.floor(Math.random() * (999999 - 100000)) + 100000;
    this.tmp = filePath;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
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
