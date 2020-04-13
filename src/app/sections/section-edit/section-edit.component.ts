import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { database } from 'firebase';

@Component({
  selector: 'app-section-edit',
  templateUrl: './section-edit.component.html',
  styleUrls: ['./section-edit.component.scss']
})
export class SectionEditComponent implements OnInit {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  tmp: string;
  
  i = {
    name:'',
    url:'',
    description:'',
    image:'',
  };
  id;
  chng: boolean;
  ite: Observable<any>;
  constructor(private storage: AngularFireStorage, public ad: AngularFirestore, public r: Router, route: ActivatedRoute) {
    route.params.subscribe(res => {
      this.id = res.section;
      this.ite = ad.collection('sections').doc(res.section).valueChanges()
   
      this.ite.subscribe(x=>{
        this.i = {
          name: x.name,
          image: x.image,

          url: x.url,
          description: x.description,
        };
      })
      
    });
  }

  saveData(section) {

    if(this.chng === true){
      console.log('change ', true);
      this.storage.ref(this.tmp).getDownloadURL().subscribe(z => {
        if (z) {
          this.ad.collection('sections').doc(this.id )
            .update(
              {
                name: section.name,
                image: z,
                description: section.description,
                url: section.url,
              }
            ).then(x => {
              console.log("data", x);
              this.r.navigate(['/sections/' + this.id ]);
            })
        }
      })
    } else{
      console.log('change ', false);

      this.ad.collection('sections').doc(this.id )
        .update(
          {
            name: section.name,
            description: section.description,
            url: section.url,
          }
        ).then(x => {
          console.log("data", x);
          this.r.navigate(['/sections/' + this.id ]);
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
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize (() => this.downloadURL = fileRef.getDownloadURL())
    )
      .subscribe()
  }
  ngOnInit(): void {
  }

}
