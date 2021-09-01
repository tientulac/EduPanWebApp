import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { common } from 'src/app/app.common';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators, MaxLengthValidator, AbstractControl, } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { ChuyenGiaService } from 'src/app/utils/services/DanhMucService/ChuyenGia.service';
import { PhuongPhapNghienCuuService } from 'src/app/utils/services/DanhMucService/PhuongPhapNghienCuu.service';
import { CongTrinhNghienCuuService } from 'src/app/utils/services/DanhMucService/CongTrinhNghienCuu.service';
import { ChucDanhService } from 'src/app/utils/services/DanhMucService/ChucDanh.service';

@Component({
  selector: 'app-chuyen-gia',
  templateUrl: './chuyen-gia.component.html',
  styleUrls: ['./chuyen-gia.component.scss']
})
export class ChuyenGiaComponent implements OnInit {

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
  dataCongTrinh: any;
  dataPhuongPhap: any;
  dataHocHam: any;
  dataHocVi: any;

  Insert = new FormGroup({
    Ten_chuyen_gia: new FormControl('', [Validators.required]),
    ID_hoc_ham: new FormControl('', [Validators.required]),
    ID_hoc_vi: new FormControl('', [Validators.required]),
    Gioi_tinh: new FormControl('', [Validators.required]),
    Ngay_sinh: new FormControl('', [Validators.required]),
    ID_phuong_phap: new FormControl(''),
    ID_cong_trinh: new FormControl(''),
  });

  constructor(
    public spinner: NgxSpinnerService,
    private modalService: NgbModal,
    public router: Router,
    private fromBuilder: FormBuilder,
    private toastr: ToastrService,
    private ChuyenGia: ChuyenGiaService,
    private PhuongPhap: PhuongPhapNghienCuuService,
    private ConTrinh: CongTrinhNghienCuuService,
    private ChucDanh: ChucDanhService
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
          title: 'Họ và tên',
          className: "dt-center"
        },
        {
          title: 'Học hàm',
          className: "dt-center"
        },
        {
          title: 'Học vị',
          className: "dt-center"
        },
        {
          title: 'Giới tính',
          className: "dt-center"
        },
        {
          title: 'Ngày sinh',
          className: "dt-center"
        },
        {
          title: 'Phương pháp nổi bật',
          className: "dt-center"
        },
        {
          title: 'Côn trình nổi bật',
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
    this.ChuyenGia.Load_List(this.Token)
      .subscribe(z => {
        this.dataTable = z.Data;
        this.dtTrigger.next();
        this.ConTrinh.Load_List(this.Token).subscribe(
          (res) => {
            this.dataCongTrinh = res.Data;
            this.PhuongPhap.Load_List(this.Token).subscribe(
              (res) => {
                this.dataPhuongPhap = res.Data;
                this.ChucDanh.Load_List(this.Token).subscribe(
                  (res) => {
                    this.dataHocHam = res.Data1;
                    this.dataHocVi = res.Data2; 
                  }
                );
              }
            );
          }
        );
    });
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
    this.selected_ID = Data.ID_chuyen_gia;
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
          Gioi_tinh: true,
          ID_hoc_ham: '',
          ID_hoc_vi: '',
          ID_phuong_phap: '',
          ID_cong_trinh: ''
        })
        this.checkInsert = true;
        this.titleModal = "Thêm mới";
      }
      if(type=="Update") {
        this.checkInsert =false;
        this.titleModal = "cập nhật";
        this.Insert.patchValue({
          Ten_chuyen_gia: Data.Ten_chuyen_gia,
          ID_hoc_ham: Data.ID_hoc_ham,
          ID_hoc_vi: Data.ID_hoc_vi,
          Gioi_tinh: Data.Gioi_tinh,
          Ngay_sinh: Data.Ngay_sinh.substring(0,10),
          ID_phuong_phap: Data.ID_phuong_phap,
          ID_cong_trinh: Data.ID_cong_trinh,
        });
      }
      if (type == "Delete") {
        this.selected_ID = Data.ID_chuyen_gia;
      }
  }

  Delete() {
    this.ChuyenGia.Delete(this.selected_ID, this.Token)
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
      Ten_chuyen_gia: this.Insert.value.Ten_chuyen_gia,
      ID_chuyen_gia: this.selected_ID,
      ID_hoc_ham: this.Insert.value.ID_hoc_ham,
      ID_hoc_vi: this.Insert.value.ID_hoc_vi,
      Gioi_tinh: this.Insert.value.Gioi_tinh,
      Ngay_sinh: this.Insert.value.Ngay_sinh,
      ID_phuong_phap: this.Insert.value.ID_phuong_phap,
      ID_cong_trinh: this.Insert.value.ID_cong_trinh,
    }
    this.spinner.show();
    if(this.checkInsert){
      this.ChuyenGia.Insert(req,this.Token).subscribe((res)=>{
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
      this.ChuyenGia.Update(req,this.Token).subscribe((res)=>{
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
}
