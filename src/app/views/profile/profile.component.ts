import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/utils/services/app.service';
import { common } from 'src/app/app.common';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent implements OnInit {

  public com: common;
  Token: any;
  UserID_get: any;
  UserName_get: any;
  UserEmail_get: any;
  FullName_get: any;

  constructor(
    public appService: AppService,
    public router: Router,
    public spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) {}

  InforForm = new FormGroup({
    Ho_ten: new FormControl(''),
    Email: new FormControl(''),
  })

  ngOnInit() {
    this.com = new common(this.router);
    this.com.CheckLogin();
    var a = this.com.getUserinfo();
    this.Token = a.Token;
    this.UserID_get = a.Info.UserID;
    this.UserName_get = a.Info.UserName;
    this.UserEmail_get = a.Info.Email; 
    this.FullName_get = a.Info.FullName;
    this.InforForm.patchValue({
      Ho_ten: this.FullName_get,
      Email: this.UserEmail_get
    })  
  }
}
