import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { BlankComponent } from './views/blank/blank.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AuthGuard } from './utils/guards/auth.guard';
import { NonAuthGuard } from './utils/guards/non-auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DangNhapComponent } from './pages/dang-nhap/dang-nhap.component';
import { PortalComponent } from './pages/portal/portal.component';
import { ProfileComponent } from './views/profile/profile.component';
import { ChangePassComponent } from './pages/change-pass/change-pass.component';
import { TestComponent } from './components/test/test.component';
import { HocHamComponent } from './components/hoc-ham/hoc-ham.component';
import { HocViComponent } from './components/hoc-vi/hoc-vi.component';
import { CongTrinhNghienCuuComponent } from './components/cong-trinh-nghien-cuu/cong-trinh-nghien-cuu.component';
import { DiaPhuongComponent } from './components/dia-phuong/dia-phuong.component';
import { DanhSachHoTroComponent } from './components/danh-sach-ho-tro/danh-sach-ho-tro.component';
import { LoaiHoTroComponent } from './components/loai-ho-tro/loai-ho-tro.component';
 import { HoiThaoComponent } from './components/hoi-thao/hoi-thao.component';
import { LoaiHocBongComponent } from './components/loai-hoc-bong/loai-hoc-bong.component';
import { LoaiVeMoiComponent } from './components/loai-ve-moi/loai-ve-moi.component';
import { PhuongPhapNghienCuuComponent } from './components/phuong-phap-nghien-cuu/phuong-phap-nghien-cuu.component';
import { ChuyenGiaComponent } from './components/chuyen-gia/chuyen-gia.component';
import { SinhVienComponent } from './components/sinh-vien/sinh-vien.component';
import { TruongHocComponent } from './components/truong-hoc/truong-hoc.component';
import { TrungTamComponent } from './components/trung-tam/trung-tam.component';
import { TaiLieuHoiThaoComponent } from './components/tai-lieu-hoi-thao/tai-lieu-hoi-thao.component';
import { HocBongSinhVienComponent } from './components/hoc-bong-sinh-vien/hoc-bong-sinh-vien.component';
import { PhongHopComponent } from './components/phong-hop/phong-hop.component';
import { HomePageComponentComponent } from './UserPage/home-page-component/home-page-component.component';
import { MainComponentComponent } from './UserPage/main-component/main-component.component';
import { HocBongSinhVienSectionComponent } from './UserPage/section/hoc-bong-sinh-vien-section/hoc-bong-sinh-vien-section.component';
import { SinhVienGianhHbComponent } from './UserPage/section/sinh-vien-gianh-hb/sinh-vien-gianh-hb.component';
import { DiaPhuongKhoKhanComponent } from './UserPage/section/dia-phuong-kho-khan/dia-phuong-kho-khan.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'hoc-ham',
        component: HocHamComponent,
      },
      {
        path: 'hoc-vi',
        component: HocViComponent,
      },
      {
        path: 'cong-trinh-nghien-cuu',
        component: CongTrinhNghienCuuComponent,
      },
      {
        path: 'danh-sach-ho-tro',
        component: DanhSachHoTroComponent,
      },
      {
        path: 'dia-phuong',
        component: DiaPhuongComponent,
      },
      {
        path: 'loai-ho-tro',
        component: LoaiHoTroComponent,
      },
      {
        path: 'hoi-thao',
        component: HoiThaoComponent,
      },
      {
        path: 'loai-hoc-bong',
        component: LoaiHocBongComponent,
      },
      {
        path: 'loai-ve-moi',
        component: LoaiVeMoiComponent,
      },
      {
        path: 'phuong-phap-nghien-cuu',
        component: PhuongPhapNghienCuuComponent,
      },
      {
        path: 'chuyen-gia',
        component: ChuyenGiaComponent,
      },
      {
        path: 'sinh-vien',
        component: SinhVienComponent,
      },
      {
        path: 'truong-hoc',
        component: TruongHocComponent,
      },
      {
        path: 'trung-tam',
        component: TrungTamComponent,
      },
      {
        path: 'tai-lieu-hoi-thao',
        component: TaiLieuHoiThaoComponent,
      },
      {
        path: 'hoc-bong-sinh-vien',
        component: HocBongSinhVienComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'change-pass',
        component: ChangePassComponent,
      },
      {
        path: 'phong-hop',
        component: PhongHopComponent,
      },
      {
        path: 'test',
        component: TestComponent,
        canActivate: [NonAuthGuard],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NonAuthGuard],
  },
  {
    path: 'home-page',
    component: HomePageComponentComponent,
    canActivate: [NonAuthGuard],
    children: [
      {
        path: '',
        component: MainComponentComponent,
      },
      {
        path: 'danh-sach-hoc-bong-sinh-vien',
        component: HocBongSinhVienSectionComponent,
      },
      {
        path: 'sinh-vien-gianh-hb',
        component: SinhVienGianhHbComponent,
      },
      {
        path: 'dia-phuong-kho-khan',
        component: DiaPhuongKhoKhanComponent,
      },
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }), BrowserModule, HttpClientModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}

