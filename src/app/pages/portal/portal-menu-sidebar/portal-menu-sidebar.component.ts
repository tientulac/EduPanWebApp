import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { AppService } from 'src/app/utils/services/app.service';

@Component({
  selector: 'app-portal-menu-sidebar',
  templateUrl: './portal-menu-sidebar.component.html',
  styleUrls: ['./portal-menu-sidebar.component.scss']
})
export class PortalMenuSidebarComponent implements OnInit {
  @ViewChild('mainSidebar', { static: false }) mainSidebar;
  @Output() mainSidebarHeight: EventEmitter<any> = new EventEmitter<any>();
  constructor(public appService: AppService) {}
  styleLi: string = 'nav-item ';

  ngOnInit() {}
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

}
