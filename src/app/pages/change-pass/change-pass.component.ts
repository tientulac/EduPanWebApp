import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestLogin } from './../../Models/input.model/RequestLogin';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { common } from 'src/app/app.common';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountService } from './../../utils/services/Account.service';
import { ResponseLogin } from 'src/app/Models/output.model/ResponseLogin';
@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {

  title = "Đổi mật khẩu";
  requestObject: RequestLogin = new RequestLogin()
  RequestLogin: RequestLogin;
  InfoUser: ResponseLogin;
  Username: any;
  Old_Password: any;
  New_Password: any;
  Confirm_Password: any;
  ValidatePassword: any;
  isPassword: boolean = true;

  com: common;

  ChangePasswordForm = new FormGroup({
    Old_Password_Form: new FormControl(null, [Validators.required]),
    New_Password_Form: new FormControl(null, [Validators.required]),
    Confirm_Password_Form: new FormControl(null, [Validators.required])
  })
  
  constructor(
    public spinner: NgxSpinnerService,
    private modalService: NgbModal,
    public router: Router,
    private fromBuilder: FormBuilder,
    private toastr: ToastrService,
    private AccountService: AccountService
  ) { }

  ngOnInit(): void {
    this.com = new common(this.router);
    this.com.CheckLogin();
    this.com.getUserinfo();
  }

  show() {
    this.isPassword = !(this.isPassword);
  }
  ChangePass() {
    var a = this.com.getUserinfo();
    if (this.ChangePasswordForm.valid) {
      this.Username = a.Info.UserName;
      this.Old_Password = this.ChangePasswordForm.controls.Old_Password_Form.value;
      this.New_Password = this.ChangePasswordForm.controls.New_Password_Form.value;
      this.Confirm_Password = this.ChangePasswordForm.controls.Confirm_Password_Form.value;
      this.requestObject.UserName = a.Info.UserName;
      if (this.New_Password == this.Confirm_Password) {
        let req = {
          UserName: this.Username,
          Password: this.Old_Password,
          NewPassword: this.New_Password,
        }
        this.AccountService.ChangePass(req, a.Token)
          .subscribe(z => {
            if (z.Status == 1) {
              this.toastr.success('Đổi mật khẩu thành công');
              this.router.navigate(['/']);
            } else {
              this.toastr.error(z.Message, 'Thao tác thất bại');
            }
          })
      } else {
         this.toastr.warning('Mật khẩu mới của bạn không trùng khớp', 'Thao tác thất bại'); 
      }
    } else {
      this.toastr.error('Vui lòng nhập đầy đủ thông tin', 'Tác vụ thất bại');
    };
  }
}
