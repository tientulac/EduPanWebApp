import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { common } from 'src/app/app.common';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators, MaxLengthValidator, AbstractControl, } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { KhoaService } from 'src/app/utils/services/DanhMucService/Khoa.service';
import { TruongHocService } from 'src/app/utils/services/DanhMucService/TruongHoc.service';

@Component({
  selector: 'app-khoa',
  templateUrl: './khoa.component.html',
  styleUrls: ['./khoa.component.scss']
})
export class KhoaComponent implements OnInit {

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
  dataTruong: any;

  Insert = new FormGroup({
    Ma_khoa: new FormControl('', [Validators.required]),
    Ten_khoa: new FormControl('', [Validators.required]),
    ID_truong: new FormControl('', [Validators.required]),
  });

  constructor(
    public spinner: NgxSpinnerService,
    private modalService: NgbModal,
    public router: Router,
    private fromBuilder: FormBuilder,
    private toastr: ToastrService,
    private KhoaService: KhoaService,
    private TruongHoc: TruongHocService
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
          title: 'Mã khoa',
          className: "dt-center"
        },
        {
          title: 'Tên khoa',
          className: "dt-center"
        },
        {
          title: 'Trường học',
          className: "dt-center"
        },
        {
          title: 'Thao tác',
          className: "dt-center"
        },
      ],
    };
    this.GetAll();
    this.GetTruong();
  }

  GetAll() {
    this.KhoaService.Load_List(this.Token)
      .subscribe(z => {
        this.dataTable = z.Data;
        this.dtTrigger.next();
    });
  }

  GetTruong() {
    this.TruongHoc.Load_List(this.Token).subscribe(
      (res) => {
        this.dataTruong = res.Data;
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
    this.selected_ID = Data.ID_khoa;
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
          ID_truong: '' 
        })
        this.checkInsert = true;
        this.titleModal = "Thêm mới";
      }
      if(type=="Update") {
        this.checkInsert =false;
        this.titleModal = "cập nhật";
        this.Insert.patchValue({
          Ma_khoa: Data.Ma_khoa,
          Ten_khoa: Data.Ten_khoa,
          ID_truong: Data.ID_truong
        });
      }
      if (type == "Delete") {
        this.selected_ID = Data.ID_khoa;
      }
  }

  Delete() {
    this.KhoaService.Delete(this.selected_ID, this.Token)
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
      ID_khoa: this.selected_ID,
      Ma_khoa: this.Insert.value.Ma_khoa,
      Ten_khoa: this.Insert.value.Ten_khoa,
      ID_truong: this.Insert.value.ID_truong
    }
    this.spinner.show();
    if(this.checkInsert){
      this.KhoaService.Insert(req,this.Token).subscribe((res)=>{
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
      this.KhoaService.Update(req,this.Token).subscribe((res)=>{
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
