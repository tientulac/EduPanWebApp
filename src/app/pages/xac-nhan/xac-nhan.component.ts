import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from 'src/app/utils/services/app.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AccService } from 'src/app/utils/services/acc.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-xac-nhan',
  templateUrl: './xac-nhan.component.html',
  styleUrls: ['./xac-nhan.component.scss', './main.css']
})
export class XacNhanComponent implements OnInit {
  public registerForm: FormGroup;
  Title: string = "";
  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private appService: AppService,
    private http: HttpClient,
    private cookieService: CookieService,
    private Acc: AccService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'login-page');
    //this.renderer.addClass(document.querySelector('app-root'), 'register-page');
    this.registerForm = new FormGroup({
      HoTen: new FormControl(null, Validators.required),
      NgaySinh: new FormControl(null, Validators.required),
      CMND: new FormControl(null, Validators.required),
      Email: new FormControl(null, [Validators.email, Validators.required]),
    });
  }

  // Confirm() {
  //   this.Title="";
  //   if (this.registerForm.valid) {
  //     this.spinner.show();
  //     let req = {
  //       HoTen: this.registerForm.controls.HoTen.value,
  //       NgaySinh: this.registerForm.controls.NgaySinh.value,
  //       CMND: this.registerForm.controls.CMND.value,
  //       Email: this.registerForm.controls.Email.value,
  //       UserCategory: 3,
  //     };
  //     this.Acc.Confirm(req).subscribe((z) => {
  //       this.spinner.hide();
  //       if (z.Status == 1) {
  //         localStorage.setItem('PortalInfo', JSON.stringify(z));
  //         this.toastr.success(z.Message, 'Tác vụ thành công')
  //         this.Title=z.Message;
  //       } else {
  //         this.toastr.error(z.Message, 'Tác vụ thất bại');
  //         localStorage.removeItem('PortalInfo');
  //       }
  //     });
  //   } else {
  //     this.toastr.error('Vui lòng nhập kiểm tra lại thông tin đã nhập', 'Tác vụ thất bại');
  //   }
  // }

  ngOnDestroy() {
    // this.renderer.removeClass(
    //   document.querySelector('app-root'),
    //   'register-page'
    // );
    this.renderer.removeClass(document.body, 'login-page');
  }
}
