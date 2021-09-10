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
import { SinhVienService } from 'src/app/utils/services/DanhMucService/SinhVien.service';
import { LoaiService } from 'src/app/utils/services/DanhMucService/Loai.service';
import { HocBongSinhVienService } from 'src/app/utils/services/DanhMucService/HocBongSinhVien.service';

@Component({
  selector: 'app-hoc-bong-sinh-vien',
  templateUrl: './hoc-bong-sinh-vien.component.html',
  styleUrls: ['./hoc-bong-sinh-vien.component.scss']
})
export class HocBongSinhVienComponent implements OnInit {

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
  
  dataSinhVien: any;
  dataLoaiHocBong: any;

  dataTrangThai = [
    {
      "Trang_thai": "1",
      "Ten_trang_thai": "Đã duyệt",
    },
    {
      "Trang_thai": "2",
      "Ten_trang_thai": "Chờ duyệt",
    },
    {
      "Trang_thai": "3",
      "Ten_trang_thai": "Từ chối duyệt",
    },
    {
      "Trang_thai": "4",
      "Ten_trang_thai": "Đã chuyển đến sinh viên",
    },
  ];

  Insert = new FormGroup({
    ID_loai: new FormControl('', [Validators.required]),
    Ten_hoc_bong: new FormControl('', [Validators.required]),
    Ngay_cap: new FormControl('', [Validators.required]),
    Trang_thai: new FormControl('', [Validators.required]),
    ID_sinh_vien: new FormControl('', [Validators.required]),
    Gia_tri_max: new FormControl('', [Validators.required]),
    Ngay_het_han: new FormControl('', [Validators.required]),
  });

  StatusForm = new FormGroup({
    Trang_thai: new FormControl('')
  })

  constructor(
    public spinner: NgxSpinnerService,
    private modalService: NgbModal,
    public router: Router,
    private fromBuilder: FormBuilder,
    private toastr: ToastrService,
    private HocBongSinhVien: HocBongSinhVienService,
    private LoaiHocBong: LoaiService,
    private SinhVien: SinhVienService
  ) { }

  ngOnInit(): void {
    this.com = new common(this.router);
    this.com.CheckLogin();
    var a = this.com.getUserinfo();
    this.Token = a.Token;
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
          title: 'Ngày hết hạn',
          className: "dt-center"
        },
        {
          title: 'Loại học bổng',
          className: "dt-center"
        },
        {
          title: 'Giá trị',
          className: "dt-center"
        },
        {
          title: 'Sinh viên',
          className: "dt-center"
        },
        {
          title: 'Trạng thái',
          className: "dt-center"
        },
        {
          title: 'Thao tác',
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
        this.SinhVien.Load_List(this.Token).subscribe(
          (res) => {
            this.dataSinhVien = res.Data;
            this.LoaiHocBong.LoaiHocBong_Load_List(this.Token).subscribe(
              (res) => {
                this.dataLoaiHocBong = res.Data;
              }
            );
          }
        );
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  open(content, sizm, type, Data) {
    this.selected_ID = Data.ID_hb_sv;
    this.submitted = false;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: sizm })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );

      if(type=="Add"){
        this.Insert.reset();
        this.Insert.patchValue({
          ID_loai: '',
          Trang_thai: '',
          ID_sinh_vien: ''
        })
        this.checkInsert = true;
        this.titleModal = "Thêm mới";
      }
      if(type=="Update") {
        this.checkInsert =false;
        this.titleModal = "cập nhật";
        this.Insert.patchValue({
          ID_loai: Data.ID_loai,
          Ten_hoc_bong: Data.Ten_hoc_bong,
          Ngay_cap: Data.Ngay_cap.substring(0,10),
          Trang_thai: Data.Trang_thai,
          ID_sinh_vien: Data.ID_sinh_vien,
          Gia_tri_max: Data.Gia_tri_max,
          Ngay_het_han: Data.Ngay_het_han
        });
      }
      if (type == "Delete" || type == "Status") {
        this.selected_ID = Data.ID_hb_sv;
      }
  }

  Delete() {
    this.HocBongSinhVien.Delete(this.selected_ID, this.Token)
      .subscribe(z => {
        this.modalService.dismissAll('DeleteModal');
        if (z.Status == 2) {
          this.spinner.show();
          this.toastr.warning(z.Message);
          this.spinner.hide();
        } else if (z.Status == 1) {
          this.spinner.show();
          this.toastr.success("Xóa thành công !");
          this.spinner.hide();
        } else {
          this.spinner.show();
          this.toastr.error(z.Message);
          this.spinner.hide();
        };
        this.GetAll();
        this.datatableElement.dtInstance.then(
          (dtInstance: DataTables.Api) => {
            dtInstance.destroy();
          }
        );
        this.spinner.hide();
      },
      (err) => {
       if (err.status == 401) {
        this.spinner.show();
          this.toastr.warning(
            'Bạn không có quyền sử dụng chức năng này, vui lòng liên hệ với quản trị viên để được hỗ trợ!'
          );
          this.spinner.hide();
        }
      });
  }

  get checkvalueInsert() {
    return this.Insert.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.Insert.invalid) {
      return false;
    }
    let req = {
      ID_hb_sv: this.selected_ID,
      ID_loai: this.Insert.value.ID_loai,
      Ten_hoc_bong: this.Insert.value.Ten_hoc_bong,
      Ngay_cap: this.Insert.value.Ngay_cap,
      Trang_thai: this.Insert.value.Trang_thai,
      ID_sinh_vien: this.Insert.value.ID_sinh_vien,
      Gia_tri_max: this.Insert.value.Gia_tri_max,
      Ngay_het_han: this.Insert.value.Ngay_het_han,
    }
    this.spinner.show();
    if(this.checkInsert){
      this.HocBongSinhVien.Insert(req,this.Token).subscribe((res)=>{
        if (res.Status == 2) {
          this.toastr.warning(res.Message);
          this.spinner.hide();
        } else if (res.Status == 1) {
          this.toastr.success(res.Message);
          this.spinner.hide();
        } else if (res.Status == 4) {
          this.toastr.error('Thêm mới thất bại!');
          this.spinner.hide();
        }
        this.modalService.dismissAll('AddModal');
        this.datatableElement.dtInstance.then(
          (dtInstance: DataTables.Api) => {
            dtInstance.destroy();
          }
        );
        this.spinner.hide();
        this.GetAll();
      },
      (err) => {
        this.spinner.hide();
        if (err.status == 0) {
          localStorage.removeItem('UserInfo');
          this.router.navigate(['/login']);
        }
        if (err.status == 401) {
          this.toastr.warning(
            'Bạn không có quyền sử dụng chức năng này, vui lòng liên hệ với quản trị viên để được hỗ trợ!'
          );
        }
      })
    }else{
      this.HocBongSinhVien.Update(req,this.Token).subscribe((res)=>{
        if (res.Status == 2) {
          this.toastr.warning(res.Message);
          this.spinner.hide();
        } else if (res.Status == 1) {
          this.toastr.success(res.Message);
          this.spinner.hide();
        } else if (res.Status == 4) {
          this.toastr.error('Cập nhật thất bại!');
          this.spinner.hide();
        }
        this.modalService.dismissAll('AddModal');
        this.datatableElement.dtInstance.then(
          (dtInstance: DataTables.Api) => {
            dtInstance.destroy();
          }
        );
        this.spinner.hide();
        this.GetAll();
      },
      (err) => {

        this.spinner.hide();
        if (err.status == 0) {
          localStorage.removeItem('UserInfo');
          this.router.navigate(['/login']);
        }
        if (err.status == 401) {
          this.toastr.warning(
            'Bạn không có quyền sử dụng chức năng này, vui lòng liên hệ với quản trị viên để được hỗ trợ!'
          );
        }
      })
    }
  }

  changeStatus() {
    this.submitted = true;
    this.HocBongSinhVien.ChangeStatus(this.selected_ID,this.StatusForm.value.Trang_thai,this.Token).subscribe((res)=>{
      if (res.Status == 2) {
        this.toastr.warning(res.Message);
      } else if (res.Status == 1) {
        this.toastr.success(res.Message);
      } else if (res.Status == 4) {
        this.toastr.error('Thêm mới thất bại!');
      }
      this.modalService.dismissAll('');
      this.StatusForm.reset();
      this.datatableElement.dtInstance.then(
        (dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        }
      );
      this.GetAll();
    },
    (err) => {

      this.spinner.hide();
      if (err.status == 0) {
        localStorage.removeItem('UserInfo');
        this.router.navigate(['/login']);
      }
      if (err.status == 401) {
        this.toastr.warning(
          'Bạn không có quyền sử dụng chức năng này, vui lòng liên hệ với quản trị viên để được hỗ trợ!'
        );
      }
    })
  }
}
