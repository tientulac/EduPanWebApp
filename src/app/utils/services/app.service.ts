import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public user = {
    firstName: 'Alexander',
    lastName: 'Pierce',
    image: 'assets/img/user2-160x160.jpg',
  };

  constructor(private router: Router) {}

  login() {
    localStorage.setItem('token', 'LOGGED_IN');
    this.router.navigate(['/admin']);
  }
  loginPortal() {
    localStorage.setItem('token', 'LOGGED_IN');
    this.router.navigate(['/dang-ky']);
  }

  register() {
    localStorage.setItem('token', 'LOGGED_IN');
    this.router.navigate(['/']);
  }

  logout() {
    localStorage.removeItem('UserInfo');
    this.router.navigate(['/login']);
  }
  logoutPortal() {
    localStorage.removeItem('UserInfo');
    this.router.navigate(['/dang-nhap']);
  }
}
