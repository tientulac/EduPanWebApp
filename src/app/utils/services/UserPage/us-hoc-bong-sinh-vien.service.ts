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
export class USHocBongSinhVienService {

  constructor(
    @Inject(AppConfig) private readonly appConfig: AppConfiguration,
    private router: Router,
    private http: HttpClient
  ) { }

  Load_List(): Observable<any> {
    return this.http.get<any>(this.appConfig.EduPan + 'HocBongSinhVien/Load_List', {   
   }).pipe(map((z) => {return z;}));
  }
}
