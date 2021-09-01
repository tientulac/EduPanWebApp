import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './pages/main/header/header.component';
import { FooterComponent } from './pages/main/footer/footer.component';
import { MenuSidebarComponent } from './pages/main/menu-sidebar/menu-sidebar.component';
import { BlankComponent } from './views/blank/blank.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileComponent } from './views/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { MessagesDropdownMenuComponent } from './pages/main/header/messages-dropdown-menu/messages-dropdown-menu.component';
import { NotificationsDropdownMenuComponent } from './pages/main/header/notifications-dropdown-menu/notifications-dropdown-menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import {
  registerLocaleData,
  LocationStrategy,
  HashLocationStrategy,
} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import { UserDropdownMenuComponent } from './pages/main/header/user-dropdown-menu/user-dropdown-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DataTablesModule } from 'angular-datatables';
import { CookieService } from 'ngx-cookie-service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DangNhapComponent } from './pages/dang-nhap/dang-nhap.component';
import { XacNhanComponent } from './pages/xac-nhan/xac-nhan.component';
import { PortalComponent } from './pages/portal/portal.component';
import { PortalFooterComponent } from './pages/portal/portal-footer/portal-footer.component';
import { PortalHeaderComponent } from './pages/portal/portal-header/portal-header.component';
import { PortalMenuSidebarComponent } from './pages/portal/portal-menu-sidebar/portal-menu-sidebar.component';
import { PortalUserDropdownComponent } from './pages/portal/portal-header/portal-user-dropdown/portal-user-dropdown.component';
import { ChangePassComponent } from './pages/change-pass/change-pass.component';
import {ProgressBarModule} from "angular-progress-bar"
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChatBotComponent } from './pages/chat-bot/chat-bot.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { TestComponent } from './components/test/test.component';
import { HocHamComponent } from './components/hoc-ham/hoc-ham.component';
import { HocViComponent } from './components/hoc-vi/hoc-vi.component';
import { CongTrinhNghienCuuComponent } from './components/cong-trinh-nghien-cuu/cong-trinh-nghien-cuu.component';
import { ChuyenGiaComponent } from './components/chuyen-gia/chuyen-gia.component';
import { DanhSachHoTroComponent } from './components/danh-sach-ho-tro/danh-sach-ho-tro.component';
import { DiaPhuongComponent } from './components/dia-phuong/dia-phuong.component';
import { LoaiHoTroComponent } from './components/loai-ho-tro/loai-ho-tro.component';
import { HoiThaoComponent } from './components/hoi-thao/hoi-thao.component';
import { LoaiHocBongComponent } from './components/loai-hoc-bong/loai-hoc-bong.component';
import { LoaiVeMoiComponent } from './components/loai-ve-moi/loai-ve-moi.component';
import { PhuongPhapNghienCuuComponent } from './components/phuong-phap-nghien-cuu/phuong-phap-nghien-cuu.component';
import { SinhVienComponent } from './components/sinh-vien/sinh-vien.component';
import { TruongHocComponent } from './components/truong-hoc/truong-hoc.component';
import { TrungTamComponent } from './components/trung-tam/trung-tam.component';
import { TaiLieuHoiThaoComponent } from './components/tai-lieu-hoi-thao/tai-lieu-hoi-thao.component';
import { FileUploadModule } from "ng2-file-upload"; 
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { HocBongSinhVienComponent } from './components/hoc-bong-sinh-vien/hoc-bong-sinh-vien.component';
import { CongTrinhComponent } from './components/truong-hoc/cong-trinh/cong-trinh.component';
import { PhuongPhapComponent } from './components/truong-hoc/phuong-phap/phuong-phap.component';
import { PhongMotComponent } from './components/test/phong-mot/phong-mot.component';
import { PhongHopComponent } from './components/phong-hop/phong-hop.component';
import { HomePageComponentComponent } from './UserPage/home-page-component/home-page-component.component';
import { HeaderComponentComponent } from './UserPage/header-component/header-component.component';
import { FooterComponentComponent } from './UserPage/footer-component/footer-component.component';
import { MainComponentComponent } from './UserPage/main-component/main-component.component';
import { HocBongSinhVienSectionComponent } from './UserPage/section/hoc-bong-sinh-vien-section/hoc-bong-sinh-vien-section.component';
import { SinhVienGianhHbComponent } from './UserPage/section/sinh-vien-gianh-hb/sinh-vien-gianh-hb.component';
import { DiaPhuongKhoKhanComponent } from './UserPage/section/dia-phuong-kho-khan/dia-phuong-kho-khan.component';

registerLocaleData(localeEn, 'en-EN');
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MenuSidebarComponent,
    BlankComponent,
    ProfileComponent,
    DashboardComponent,
    MessagesDropdownMenuComponent,
    NotificationsDropdownMenuComponent,
    UserDropdownMenuComponent,
    DangNhapComponent,
    XacNhanComponent,
    PortalComponent,
    PortalFooterComponent,
    PortalHeaderComponent,
    PortalMenuSidebarComponent,
    PortalUserDropdownComponent,
    ChangePassComponent,
    ChatBotComponent,
    TestComponent,
    HocHamComponent,
    HocViComponent,
    CongTrinhNghienCuuComponent,
    ChuyenGiaComponent,
    DanhSachHoTroComponent,
    DiaPhuongComponent,
    LoaiHoTroComponent,
    HoiThaoComponent,
    LoaiHocBongComponent,
    LoaiVeMoiComponent,
    PhuongPhapNghienCuuComponent,
    SinhVienComponent,
    TruongHocComponent,
    TrungTamComponent,
    TaiLieuHoiThaoComponent,
    HocBongSinhVienComponent,
    CongTrinhComponent,
    PhuongPhapComponent,
    PhongMotComponent,
    PhongHopComponent,
    HomePageComponentComponent,
    HeaderComponentComponent,
    FooterComponentComponent,
    MainComponentComponent,
    HocBongSinhVienSectionComponent,
    SinhVienGianhHbComponent,
    DiaPhuongKhoKhanComponent,
  ],
  imports: [
    AgGridModule.withComponents([]),
    FileUploadModule,
    NgxPaginationModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    NgbModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    ProgressBarModule,
    MatProgressBarModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [
    CookieService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
