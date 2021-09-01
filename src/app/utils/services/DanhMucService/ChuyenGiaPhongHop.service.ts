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
export class ChuyenGiaPhongHopService {

  constructor(
    @Inject(AppConfig) private readonly appConfig: AppConfiguration,
    private router: Router,
    private http: HttpClient
  ) { }

  Load_List(token): Observable<any> {
    return this.http.get<any>(this.appConfig.EduPan + 'ChuyenGiaPhongHop/Load_List', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
   }).pipe(map((z) => {return z;}));
  }

  Delete(ID_cg_ph: number, token): Observable<any> {
    return this.http.get<any>(this.appConfig.EduPan + 'ChuyenGiaPhongHop/Delete?ID_cg_ph='+ID_cg_ph,{
         headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      }).pipe(map((z) => {return z;}));
  }

  Insert(req: any, token): Observable<any> {
    return this.http.post<any>(this.appConfig.EduPan + 'ChuyenGiaPhongHop/Insert',req,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
   }).pipe(map((z) => {return z;}));
  }

}
