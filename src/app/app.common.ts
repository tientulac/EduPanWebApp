import { ResponseLogin } from 'src/app/Models/output.model/ResponseLogin';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

export class common {
  public LoginResult: ResponseLogin;
  public PortalResult: any;
  public cookieService: CookieService;
  public CheckLogin() {
    this.LoginResult = new ResponseLogin();
    this.LoginResult = this.getUserinfo();
    if (this.LoginResult == null) {
      this.router.navigate(['/login']);
    }
  }
  public CheckLoginPortal() {
    this.LoginResult = new ResponseLogin();
    this.LoginResult = this.getPortalInfo();
    if (this.LoginResult == null) {
      this.router.navigate(['/dang-nhap']);
    }
  }
  constructor(private router: Router) {}
  public getUserinfo() {
    this.LoginResult = JSON.parse(localStorage.getItem('UserInfo'));
    return this.LoginResult;
  }
  public getPortalInfo() {
    this.LoginResult = JSON.parse(localStorage.getItem('PortalInfo'));
    return this.LoginResult;
  }
  login() {
    this.router.navigate(['/']);
  }
  logout() {
    localStorage.removeItem('UserInfo');
    this.router.navigate(['/login']);
  }
}
