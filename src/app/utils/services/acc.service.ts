import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig, AppConfiguration } from 'src/configuration';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccService {  
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
  // GetPassword(req: any) {
  //   return this.http
  //     .post<any>(this.appConfig.EduPan + 'Account/GetPassword', req, {})
  //     .pipe(
  //       map((z) => {
  //         return z;
  //       })
  //     );
  // }
  // LoginWithRoles(req: any) {
  //   return this.http
  //     .post<any>(this.appConfig.EduPan + 'Account/LoginWithRoles', req, {})
  //     .pipe(
  //       map((z) => {
  //         return z;
  //       })
  //     );
  // }
  // Confirm(req: any) {
  //   return this.http
  //     .post<any>(this.appConfig.EduPan + '/Account/Confirm', req, {})
  //     .pipe(
  //       map((z) => {
  //         return z;
  //       })
  //     );
  // }
}
