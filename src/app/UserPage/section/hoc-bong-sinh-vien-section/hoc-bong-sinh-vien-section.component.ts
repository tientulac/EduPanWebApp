import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { common } from 'src/app/app.common';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators, MaxLengthValidator, AbstractControl, } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Version } from 'src/app/Models/version';
import { Subject } from 'rxjs';
import { HocBongSinhVienService } from 'src/app/utils/services/DanhMucService/HocBongSinhVien.service';

@Component({
  selector: 'app-hoc-bong-sinh-vien-section',
  templateUrl: './hoc-bong-sinh-vien-section.component.html',
  styleUrls: ['./hoc-bong-sinh-vien-section.component.scss']
})
export class HocBongSinhVienSectionComponent implements OnInit {

  dtOptions: DataTables.Settings;
  Token: string;
  dataTable: any = []
  closeResult: string;
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective
  submitted = false
  dtTrigger = new Subject();
  public com: common;
  public data: any;
  checkInsert:boolean = false;
  titleModal: any;
  selected_ID: any;

  constructor(
    public spinner: NgxSpinnerService,
    private modalService: NgbModal,
    public router: Router,
    private fromBuilder: FormBuilder,
    private toastr: ToastrService,
    private HocBongSinhVien: HocBongSinhVienService,
  ) { }

  ngOnInit(): void {
    /**-------------------------USE dtOptions to format table-------------------------*/
    // Filter DATA TABLE
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true,
      language: {
        processing: "Đang xử lý...",
        lengthMenu: "Xem _MENU_ mục",
        emptyTable: "Không có dữ liệu!",
        info: "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục",
        infoEmpty: "Đang xem 0 đến 0 trong tổng số 0 mục",
        infoFiltered: "(được lọc từ _MAX_ mục)",
        infoPostFix: "",
        search: "Tìm kiếm nhanh:",
        url: "",
        searchPlaceholder: "Nhập từ khóa cần tìm...",
        paginate: {
          first: "Đầu",
          previous: "Trước",
          next: "Tiếp",
          last: "Cuối"
        },
      },
      columns: [
        {
          title: 'STT',
          width: '4vh',
          className: "dt-center"
        },
        {
          title: 'Học bổng',
          className: "dt-center"
        },
        {
          title: 'Ngày cấp',
          className: "dt-center"
        },
        {
          title: 'Trạng thái',
          className: "dt-center"
        },
        {
          title: 'Loại học bổng',
          className: "dt-center"
        },
        {
          title: 'Sinh viên',
          className: "dt-center"
        },
      ],
    };
    this.GetAll();
  }
  GetAll() {
    this.HocBongSinhVien.Load_List(this.Token).subscribe(
      (res) => {
        this.dataTable = res.Data;
        this.dtTrigger.next();
      }
    );
  }
}
