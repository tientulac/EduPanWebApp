import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { AppConfig, AppConfiguration } from 'src/configuration';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TruongHocService {

  constructor(
    @Inject(AppConfig) private readonly appConfig: AppConfiguration,
    private router: Router,
    private http: HttpClient
  ) { }

  Load_List(token): Observable<any> {
    return this.http.get<any>(this.appConfig.EduPan + 'TruongHoc/Load_List', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
   }).pipe(map((z) => {return z;}));
  }

  Delete(ID_truong: number, token): Observable<any> {
    return this.http.get<any>(this.appConfig.EduPan + 'TruongHoc/Delete?ID_truong='+ID_truong,{
         headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      }).pipe(map((z) => {return z;}));
  }

  Update(req: any,token): Observable<any> {
    return this.http.post<any>(this.appConfig.EduPan + 'TruongHoc/Update',req,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
   }).pipe(map((z) => {return z;}));
  }

  Insert(req: any, token): Observable<any> {
    return this.http.post<any>(this.appConfig.EduPan + 'TruongHoc/Insert',req,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
   }).pipe(map((z) => {return z;}));
  }

  Load_CongTrinh(ID_truong: number, token): Observable<any> {
    return this.http.get<any>(this.appConfig.EduPan + 'TruongHoc/Load_CongTrinh?ID_truong='+ID_truong,{
         headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      }).pipe(map((z) => {return z;}));
  }

  Load_PhuongPhap(ID_truong: number, token): Observable<any> {
    return this.http.get<any>(this.appConfig.EduPan + 'TruongHoc/Load_PhuongPhap?ID_truong='+ID_truong,{
         headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      }).pipe(map((z) => {return z;}));
  }

  Insert_CongTrinh(req: any, token): Observable<any> {
    return this.http.post<any>(this.appConfig.EduPan + 'TruongHoc/Insert_CongTrinh',req,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
   }).pipe(map((z) => {return z;}));
  }

  Insert_PhuongPhap(req: any, token): Observable<any> {
    return this.http.post<any>(this.appConfig.EduPan + 'TruongHoc/Insert_PhuongPhap',req,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
   }).pipe(map((z) => {return z;}));
  }

  Delete_CongTrinh(ID_th_ct: number, token): Observable<any> {
    return this.http.get<any>(this.appConfig.EduPan + 'TruongHoc/Delete_CongTrinh?ID_th_ct='+ID_th_ct,{
         headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      }).pipe(map((z) => {return z;}));
  }

  Delete_PhuongPhap(ID_th_pp: number, token): Observable<any> {
    return this.http.get<any>(this.appConfig.EduPan + 'TruongHoc/Delete_PhuongPhap?ID_th_pp='+ID_th_pp,{
         headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      }).pipe(map((z) => {return z;}));
  }
}
