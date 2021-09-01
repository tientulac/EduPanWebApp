import { Injectable ,Inject} from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ResponseLogin } from 'src/app/Models/output.model/ResponseLogin';
import { CookieService } from 'ngx-cookie-service';
import { AppConfig, AppConfiguration } from 'src/configuration';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(@Inject(AppConfig) private readonly appConfig: AppConfiguration,private router: Router,private http : HttpClient) {}
  Login(req: any) {
    return this.http
      .post<any>(this.appConfig.EduPan + 'Account/Login', req, {})
      .pipe(
        map((z) => {
          return z;
        })
      );
  }
  ChangePass(req: any, token): Observable<any> {
    return this.http
      .post<any>(this.appConfig.EduPan + 'Account/ChangePassword', req, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      })
      .pipe(
        map((z) => {
          return z;
        })
      );
  }
}
