import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  ViewChild,
  Renderer2
} from '@angular/core';
import { common } from 'src/app/app.common';
import { Router } from '@angular/router';
import { RequestBase } from 'src/app/Models/input.model/RequestBase';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-portal-user-dropdown',
  templateUrl: './portal-user-dropdown.component.html',
  styleUrls: ['./portal-user-dropdown.component.scss']
})
export class PortalUserDropdownComponent implements OnInit {
  @ViewChild('dropdownMenu', { static: false }) dropdownMenu;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.hideDropdownMenu();
    }
  }
  requestObject: RequestBase = new RequestBase()
  com: common;
  UnReadNum: number;
  MessageLst: []
  UserName:string="Đang lấy dữ liệu..."
  constructor(public elementRef: ElementRef, public renderer: Renderer2,
    public router: Router,) { }

  ngOnInit() {
    this.com = new common(this.router);
    this.com.CheckLoginPortal();
    var User = this.com.getPortalInfo();
    this.UserName = User.Info.UserName
   
  }

  toggleDropdownMenu() {
    if (this.dropdownMenu.nativeElement.classList.contains('show')) {
      this.hideDropdownMenu();
    } else {
      this.showDropdownMenu();
    }
  }

  showDropdownMenu() {
    this.renderer.addClass(this.dropdownMenu.nativeElement, 'show');
  }

  hideDropdownMenu() {
    this.renderer.removeClass(this.dropdownMenu.nativeElement, 'show');
  }
}
