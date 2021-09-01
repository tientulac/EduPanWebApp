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
import { TruongHocService } from 'src/app/utils/services/DanhMucService/TruongHoc.service';

@Component({
  selector: 'app-truong-hoc',
  templateUrl: './truong-hoc.component.html',
  styleUrls: ['./truong-hoc.component.scss']
})
export class TruongHocComponent implements OnInit {

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
    Ma_truong: new FormControl('', [Validators.required]),
    Ten_truong: new FormControl('', [Validators.required]),
    Dia_chi: new FormControl('', [Validators.required]),
  });

  constructor(
    public spinner: NgxSpinnerService,
    private modalService: NgbModal,
    public router: Router,
    private fromBuilder: FormBuilder,
    private toastr: ToastrService,
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
          title: 'Mã địa phương',
          className: "dt-center"
        },
        {
          title: 'Tên địa phương',
          className: "dt-center"
        },
        {
          title: 'Địa chỉ',
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
    this.TruongHoc.Load_List(this.Token)
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
    this.selected_ID = Data.ID_truong;
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
          Ma_truong: Data.Ma_truong,
          Ten_truong: Data.Ten_truong,
          Dia_chi: Data.Dia_chi,
        });
      }
      if (type == "Delete") {
        this.selected_ID = Data.ID_truong;
      }
      if (type == "Detail") {
        this.titleModal = Data.Ten_truong
      }
  }

  Delete() {
    this.TruongHoc.Delete(this.selected_ID, this.Token)
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
      ID_truong: this.selected_ID,
      Ma_truong: this.Insert.value.Ma_truong,
      Ten_truong: this.Insert.value.Ten_truong,
      Dia_chi: this.Insert.value.Dia_chi
    }
    this.spinner.show();
    if(this.checkInsert){
      this.TruongHoc.Insert(req,this.Token).subscribe((res)=>{
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
      this.TruongHoc.Update(req,this.Token).subscribe((res)=>{
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
