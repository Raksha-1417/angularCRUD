import { Component, OnInit } from '@angular/core';
import { FormArrayName, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Accountmodel } from '../models/accountmodel';
import { ApiService } from '../shared/api.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  formValue:any;
  submitted=false;
  accountModelObj: Accountmodel = new Accountmodel();
  accountData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;



  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: ['',Validators.required,Validators.pattern('[A-Za-z]*'), Validators.minLength(3), Validators.maxLength(16)],
      email: ['',[Validators.required,Validators.email]],
      mobile: ['',Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(3)],
      status: [''],
    })
    this.getAccounts();

  }

  clickAddAccount() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postAccountDetails() {
    this.accountModelObj.name = this.formValue.value.name;
    this.accountModelObj.email = this.formValue.value.email;
    this.accountModelObj.mobile = this.formValue.value.mobile;
    this.accountModelObj.status = this.formValue.value.status;

    this.api.postAccounts(this.accountModelObj).subscribe(res => {
      console.log(res);
      alert("New account added successfully!")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAccounts();
    },
      err => {
        alert("Something went wrong. Please check again!")
      })
  }
  getAccounts() {
    this.api.getAccounts().subscribe(res => {
      this.accountData = res;
    }, err => {

    })
  }

  deleteAccounts(account: any) {
    this.api.deleteAccounts(account.id).subscribe(res => {
      alert("The Account deleted!")
      this.getAccounts();
    }),
      ({

      })
  }

  onEdit(account: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.accountModelObj.id = account.id;
    this.formValue.controls['name'].setValue(account.name);
    this.formValue.controls['email'].setValue(account.email);
    this.formValue.controls['mobile'].setValue(account.mobile);
    this.formValue.controls['status'].setValue(account.status);
  }

  updateAccountDetails() {
    this.accountModelObj.name = this.formValue.value.name;
    this.accountModelObj.email = this.formValue.value.email;
    this.accountModelObj.mobile = this.formValue.value.mobile;
    this.accountModelObj.status = this.formValue.value.status;

    this.api.updateAccounts(this.accountModelObj, this.accountModelObj.id).subscribe(res => {
      alert("The account updated!")

      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAccounts();
    })
  }

  get f() { return this.formValue.controls; }
  onSubmit(){
    this.submitted=true;
    console.log(this.formValue.value)
  }

}