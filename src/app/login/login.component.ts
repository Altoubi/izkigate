import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  data = {
    email:'',password:""
  }
  msg;
  showSpinner ;
  constructor(public auth: AngularFireAuth, public r: Router) {
  }
  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }
  login(d) {
    this.showSpinner = 'block';
    this.msg = "جاري تسجيل الدخول";

    this.auth.auth.signInWithEmailAndPassword(d.email, d.password).then(x=> {
      this.showSpinner = '';
      this.r.navigate(['']);
      this.msg = " نجاح ";

    })  .catch(x=>{
      this.showSpinner = '';
      this.msg = "حطا في البيانات";
    })
  }
  logout() {
    this.auth.auth.signOut();
  }

  ngOnInit(): void {
  }

}
