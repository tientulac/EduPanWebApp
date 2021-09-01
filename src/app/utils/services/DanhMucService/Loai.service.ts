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
export class LoaiService {

  constructor(
    @Inject(AppConfig) private readonly appConfig: AppConfiguration,
    private router: Router,
    private http: HttpClient
  ) { }

  LoaiHocBong_Load_List(token): Observable<any> {
    return this.http.get<any>(this.appConfig.EduPan + 'Loai/LoaiHocBong_Load_List', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
   }).pipe(map((z) => {return z;}));
  }

  LoaiHocBong_Delete(ID_loai: number, token): Observable<any> {
    return this.http.get<any>(this.appConfig.EduPan + 'Loai/LoaiHocBong_Delete?ID_loai='+ID_loai,{
         headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      }).pipe(map((z) => {return z;}));
  }

  LoaiHocBong_Update(req: any,token): Observable<any> {
    return this.http.post<any>(this.appConfig.EduPan + 'Loai/LoaiHocBong_Update',req,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
   }).pipe(map((z) => {return z;}));
  }

  LoaiHocBong_Insert(req: any, token): Observable<any> {
    return this.http.post<any>(this.appConfig.EduPan + 'Loai/LoaiHocBong_Insert',req,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
   }).pipe(map((z) => {return z;}));
  }

  LoaiHoTro_Load_List(token): Observable<any> {
    return this.http.get<any>(this.appConfig.EduPan + 'Loai/LoaiHoTro_Load_List', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
   }).pipe(map((z) => {return z;}));
  }

  LoaiVe_Load_List(token): Observable<any> {
    return this.http.get<any>(this.appConfig.EduPan + 'Loai/LoaiVe_Load_List', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
   }).pipe(map((z) => {return z;}));
  }

}
