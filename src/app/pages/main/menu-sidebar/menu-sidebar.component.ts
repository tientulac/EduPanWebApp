import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { common } from 'src/app/app.common';
import { AppService } from 'src/app/utils/services/app.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss'],
})
export class MenuSidebarComponent implements OnInit, AfterViewInit {
  @ViewChild('mainSidebar', { static: false }) mainSidebar;

  @Output() mainSidebarHeight: EventEmitter<any> = new EventEmitter<any>();

  constructor(public appService: AppService,
    private router: Router,
    private toastr: ToastrService,
    private titleService: Title
    ) { }
  styleLi: string = 'nav-item ';
  public com: common;

  ngOnInit() {
    this.com = new common(this.router);
    this.com.CheckLogin();
  }

  menu(id: string) {
    let element, name, arr;
    element = document.getElementById(id);
    arr = element.className.split(' ');
    name = 'menu-open';
    if (arr.indexOf(name) == -1) {
      element.className += ' ' + name;
    } else {
      element.className = 'nav-item';
    }
  }
  ngAfterViewInit() {
    this.mainSidebarHeight.emit(this.mainSidebar.nativeElement.offsetHeight);
  }
  public setTitle(newTitle) {
    this.titleService.setTitle(newTitle+" | EduPan");
  }
}
