import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';
import { finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
@Component({
  selector: 'app-section-add',
  templateUrl: './section-add.component.html',
  styleUrls: ['./section-add.component.scss']
})
export class SectionAddComponent implements OnInit {
  sections =  {name:'',url:0,image:'',description:''};
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  tmp: string;
  lli: string;


  constructor(private storage: AngularFireStorage, public ad: AngularFirestore, public r: Router) { 
    this.sections.url = Math.floor(Math.random() * (999999 - 100000)) + 100000;
  }

  saveData(section){
   
    this.storage.ref(this.tmp).getDownloadURL().subscribe(z => {
     if(z) {
       this.ad.collection('sections').add({
         url: this.sections.url,
         name: this.sections.name,
         description: this.sections.description,
         image: z,
       }).then(x => {
         console.log("data", x);
         this.r.navigate(['/sections']);
       })
     }
    })

    
  }

  uploadFile(event) {
    
    const file = event.target.files[0];
    const filePath = "s/s"+ Math.floor(Math.random() * (999999 - 100000)) + 100000;
    this.tmp = filePath;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL())
    )
      .subscribe()
  }
  ngOnInit(): void {
  }

}
