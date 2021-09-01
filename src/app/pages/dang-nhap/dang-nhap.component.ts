import { Component, OnInit, OnDestroy, Renderer2,NgModule } from '@angular/core';
import { AppService } from 'src/app/utils/services/app.service';
import { AccService } from 'src/app/utils/services/acc.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestBase } from 'src/app/Models/input.model/RequestBase';
import { RequestLogin } from 'src/app/Models/input.model/RequestLogin';
import { ResponseLogin } from 'src/app/Models/output.model/ResponseLogin';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dang-nhap',
  templateUrl: './dang-nhap.component.html',
  styleUrls: ['./dang-nhap.component.scss','./main.css']
})
export class DangNhapComponent implements OnInit {
  public loginForm: FormGroup;
  public m: RequestLogin;
  public LoginResult: ResponseLogin;
  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private appService: AppService,
    private http: HttpClient,
    private cookieService: CookieService,
    private spinner: NgxSpinnerService,
    private Acc: AccService
  ) {}

  ngOnInit() {
    this.renderer.addClass(document.body, 'login-page');
    this.m = new RequestLogin();
    this.cookieService.deleteAll;
    this.LoginResult = new ResponseLogin();
    this.loginForm = new FormGroup({
      UserName: new FormControl(null, Validators.required),
      Password: new FormControl(null),
    });
    // this.loginForm.controls.UserName.setValue('aaaaaaa')
  }

  Ridrect() {
    this.appService.login();
  }
  logIn() {
    if (this.loginForm.valid) {
      this.m.UserName = this.loginForm.controls.UserName.value;
      this.m.Password = this.loginForm.controls.Password.value;
      let req = {
        UserName: this.m.UserName.split(' ').join(''),
        Password: this.m.Password,
        UserCategory: 3,
      };
     this.spinner.show()
      this.Acc.Login(req).subscribe((z) => {
        this.spinner.hide()
        if (z.Status == 1) {
          localStorage.setItem('PortalInfo', JSON.stringify(z));
          this.appService.loginPortal();
        } else {
          this.toastr.error(z.Message, 'Tác vụ thất bại');
          localStorage.removeItem('PortalInfo');
        }
      });
    } else {
      this.toastr.error('Vui lòng nhập đầy đủ thông tin', 'Tác vụ thất bại');
    }
  }
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'login-page');
  }
}
