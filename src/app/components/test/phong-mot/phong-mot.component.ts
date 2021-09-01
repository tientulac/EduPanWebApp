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
import { ChuyenGiaService } from 'src/app/utils/services/DanhMucService/ChuyenGia.service';
import { PhongHopService } from 'src/app/utils/services/DanhMucService/PhongHop.service';
import { ChuyenGiaPhongHopService } from 'src/app/utils/services/DanhMucService/ChuyenGiaPhongHop.service';

@Component({
  selector: 'app-phong-mot',
  templateUrl: './phong-mot.component.html',
  styleUrls: ['./phong-mot.component.scss']
})
export class PhongMotComponent implements OnInit {

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
  selected_ID2: any;
  searchMember: any;
  dataPhongHop: any;
  So_hang_array: any = [];
  So_cot_array: any = [];
  Suc_chua_array: any = [];
  Hang_insert: any;
  Cot_insert: any;
  dataChuyenGiaPhongHop: any;

  constructor(
    public spinner: NgxSpinnerService,
    private modalService: NgbModal,
    public router: Router,
    private fromBuilder: FormBuilder,
    private toastr: ToastrService,
    private ChuyenGia: ChuyenGiaService,
    private PhongHop: PhongHopService,
    private ChuyenGiaPhongHop: ChuyenGiaPhongHopService
  ) { }

  ngOnInit(): void {
    this.GetAll();
    this.GetData();
  }

  GetAll() {
    this.ChuyenGia.Load_List(this.Token).subscribe(
      (res) => {
        this.dataTable = res.Data;
        this.ChuyenGiaPhongHop.Load_List(this.Token).subscribe(
          (res) => {
            this.dataChuyenGiaPhongHop = res.Data;
          }
        );
      }
    );
  }

  checkBox() {
    $('input[type="checkbox"]').on('change', function() {
      $('input[type="checkbox"]').not(this).prop('checked', false);
   });
  }

  GetData() {
    this.PhongHop.Load_List(this.Token).subscribe(
      (res) => {
        this.dataPhongHop = res.Data;
        this.dataPhongHop = this.dataPhongHop.filter(x => x.Ma_phong === "001");
        for (let i = 1; i<= this.dataPhongHop[0].So_cot; i++) {
          this.So_cot_array.push(i);
        }
        for (let i = 1; i<= this.dataPhongHop[0].So_hang; i++) {
          this.So_hang_array.push(i);
        }
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

  open(content, sizm, type, Hang, Cot) {
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
        this.checkInsert = true;
        this.titleModal = "Chọn thành viên";
        this.Hang_insert = Hang;
        this.Cot_insert = Cot;
      }
  }
  openDelete(content, sizm, type, Data) {
    this.selected_ID2 = Data.ID_cg_ph;
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
      if (type == "Delete") {
        this.selected_ID2 = Data.ID_cg_ph;
      }
  }

  onSubmit() {
    let req = {
      ID_phong_hop: 1,
      ID_chuyen_gia: this.dataTable.filter(x => x.Trang_thai == true)[0].ID_chuyen_gia,
      Hang: this.Hang_insert,
      Cot: this.Cot_insert
    }
    this.ChuyenGiaPhongHop.Insert(req, this.Token)
      .subscribe(z => {
        if (z.Status == 2) {
          this.spinner.show();
          this.toastr.warning(z.Message);
          this.spinner.hide();
        } else if (z.Status == 1) {
          this.spinner.show();
          this.toastr.success(z.Message);
          this.GetAll();
          this.spinner.hide();
        } else {
          this.spinner.show();
          this.toastr.error(z.Message);
          this.spinner.hide();
        };
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

  Delete() {
    this.ChuyenGiaPhongHop.Delete(this.selected_ID2, this.Token)
      .subscribe(z => {
        this.modalService.dismissAll('DeleteModal');
        if (z.Status == 2) {
          this.spinner.show();
          this.toastr.warning(z.Message);
          this.spinner.hide();
        } else if (z.Status == 1) {
          this.spinner.show();
          this.toastr.success("Xóa thành công !");
          this.GetAll();
          this.spinner.hide();
        } else {
          this.spinner.show();
          this.toastr.error(z.Message);
          this.spinner.hide();
        };
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
}
