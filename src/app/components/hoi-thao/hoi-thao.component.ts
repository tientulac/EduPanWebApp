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
import { HoiThaoService } from 'src/app/utils/services/DanhMucService/HoiThao.service';

@Component({
  selector: 'app-hoi-thao',
  templateUrl: './hoi-thao.component.html',
  styleUrls: ['./hoi-thao.component.scss']
})
export class HoiThaoComponent implements OnInit {

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

  Insert = new FormGroup({
    Ten_hoi_thao: new FormControl('', [Validators.required]),
    Ngay_bat_dau: new FormControl('', [Validators.required]),
    Ngay_ket_thuc: new FormControl('', [Validators.required]),
  });

  constructor(
    public spinner: NgxSpinnerService,
    private modalService: NgbModal,
    public router: Router,
    private fromBuilder: FormBuilder,
    private toastr: ToastrService,
    private HoiThao: HoiThaoService
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
          title: 'Tên hội thảo',
          className: "dt-center"
        },
        {
          title: 'Ngày bắt đầu',
          className: "dt-center"
        },
        {
          title: 'Ngày kết thúc',
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
    this.HoiThao.Load_List(this.Token)
      .subscribe(z => {
        this.dataTable = z.Data;
        this.dtTrigger.next();
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
    this.selected_ID = Data.ID_hoi_thao;
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
        this.checkInsert = true;
        this.titleModal = "Thêm mới";
      }
      if(type=="Update") {
        this.checkInsert =false;
        this.titleModal = "cập nhật";
        this.Insert.patchValue({
          Ten_hoi_thao: Data.Ten_hoi_thao,
          Ngay_bat_dau: Data.Ngay_bat_dau.substring(0,10),
          Ngay_ket_thuc: Data.Ngay_ket_thuc.substring(0,10),
        });
      }
      if (type == "Delete") {
        this.selected_ID = Data.ID_hoi_thao;
      }
      if (type == "Document") {
        this.titleModal = Data.Ten_hoi_thao;
      }
  }

  Delete() {
    this.HoiThao.Delete(this.selected_ID, this.Token)
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
      ID_hoi_thao: this.selected_ID,
      Ten_hoi_thao: this.Insert.value.Ten_hoi_thao,
      Ngay_bat_dau: this.Insert.value.Ngay_bat_dau,
      Ngay_ket_thuc: this.Insert.value.Ngay_ket_thuc
    }
    this.spinner.show();
    if(this.checkInsert){
      this.HoiThao.Insert(req,this.Token).subscribe((res)=>{
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
      this.HoiThao.Update(req,this.Token).subscribe((res)=>{
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
