import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss']
})
export class MainComponentComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  
  goToHBSV() {
    this.router.navigate(['danh-sach-hoc-bong-sinh-vien'], { relativeTo: this.route });
  }
  goToDPKK() {
    this.router.navigate(['dia-phuong-kho-khan'], { relativeTo: this.route });
  }
}
