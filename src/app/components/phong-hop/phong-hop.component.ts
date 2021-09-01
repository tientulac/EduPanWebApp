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
import { PhongHopService } from 'src/app/utils/services/DanhMucService/PhongHop.service';
import { HoiThaoService } from 'src/app/utils/services/DanhMucService/HoiThao.service';

@Component({
  selector: 'app-phong-hop',
  templateUrl: './phong-hop.component.html',
  styleUrls: ['./phong-hop.component.scss']
})
export class PhongHopComponent implements OnInit {

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
  dataHoiThao: any;

  Insert = new FormGroup({
    Ma_phong: new FormControl('', [Validators.required]),
    Ten_phong: new FormControl('', [Validators.required]),
    Suc_chua: new FormControl('', [Validators.required]),
    So_hang: new FormControl('', [Validators.required]),
    So_cot: new FormControl('', [Validators.required]),
    ID_hoi_thao: new FormControl('', [Validators.required]),
  });

  constructor(
    public spinner: NgxSpinnerService,
    private modalService: NgbModal,
    public router: Router,
    private fromBuilder: FormBuilder,
    private toastr: ToastrService,
    private PhongHop: PhongHopService,
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
          title: 'Mã phòng',
          className: "dt-center"
        },
        {
          title: 'Tên phòng',
          className: "dt-center"
        },
        {
          title: 'Sức chứa',
          className: "dt-center"
        },
        {
          title: 'Số hàng',
          className: "dt-center"
        },
        {
          title: 'Số cột',
          className: "dt-center"
        },
        {
          title: 'Hội thảo',
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
    this.PhongHop.Load_List(this.Token).subscribe(
      (res) => {
        this.dataTable = res.Data;
        this.dtTrigger.next();
        this.HoiThao.Load_List(this.Token).subscribe(
          (res) => {
            this.dataHoiThao = res.Data;
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
    this.selected_ID = Data.ID_phong_hop;
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
          ID_hoi_thao: ''
        })
        this.checkInsert = true;
        this.titleModal = "Thêm mới";
      }
      if(type=="Update") {
        this.checkInsert =false;
        this.titleModal = "cập nhật";
        this.Insert.patchValue({
          Ma_phong: Data.Ma_phong,
          Ten_phong: Data.Ten_phong,
          Suc_chua: Data.Suc_chua,
          So_hang: Data.So_hang,
          So_cot: Data.So_cot,
          ID_hoi_thao: Data.ID_hoi_thao,
        });
      }
      if (type == "Delete") {
        this.selected_ID = Data.ID_phong_hop;
      }
  }

  Delete() {
    this.PhongHop.Delete(this.selected_ID, this.Token)
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
      ID_phong_hop: this.selected_ID,
      Ma_phong: this.Insert.value.Ma_phong,
      Ten_phong: this.Insert.value.Ten_phong,
      Suc_chua: this.Insert.value.Suc_chua,
      So_hang: this.Insert.value.So_hang,
      So_cot: this.Insert.value.So_cot,
      ID_hoi_thao: this.Insert.value.ID_hoi_thao,
    }
    this.spinner.show();
    if(this.checkInsert){
      this.PhongHop.Insert(req,this.Token).subscribe((res)=>{
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
      this.PhongHop.Update(req,this.Token).subscribe((res)=>{
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
