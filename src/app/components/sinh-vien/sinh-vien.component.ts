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
import { TruongHocService } from 'src/app/utils/services/DanhMucService/TruongHoc.service';
import { KhoaService } from 'src/app/utils/services/DanhMucService/Khoa.service';

@Component({
  selector: 'app-sinh-vien',
  templateUrl: './sinh-vien.component.html',
  styleUrls: ['./sinh-vien.component.scss']
})
export class SinhVienComponent implements OnInit {

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

  dataTruongHoc: any;
  dataKhoa: any;

  Insert = new FormGroup({
    Ho_ten: new FormControl('', [Validators.required]),
    Dia_chi: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required]),
    So_dien_thoai: new FormControl('', [Validators.required]),
    CCCD: new FormControl('', [Validators.required]),
    Gioi_tinh: new FormControl('',[Validators.required]),
    Ngay_sinh: new FormControl('',[Validators.required]),
    ID_khoa: new FormControl('',[Validators.required]),
  });

  constructor(
    public spinner: NgxSpinnerService,
    private modalService: NgbModal,
    public router: Router,
    private fromBuilder: FormBuilder,
    private toastr: ToastrService,
    private SinhVien: SinhVienService,
    private TruongHoc: TruongHocService,
    private Khoa: KhoaService
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
        processing: "??ang x??? l??...",
        lengthMenu: "Xem _MENU_ m???c",
        emptyTable: "Kh??ng c?? d??? li???u!",
        info: "??ang xem _START_ ?????n _END_ trong t???ng s??? _TOTAL_ m???c",
        infoEmpty: "??ang xem 0 ?????n 0 trong t???ng s??? 0 m???c",
        infoFiltered: "(???????c l???c t??? _MAX_ m???c)",
        infoPostFix: "",
        search: "T??m ki???m nhanh:",
        url: "",
        searchPlaceholder: "Nh???p t??? kh??a c???n t??m...",
        paginate: {
          first: "?????u",
          previous: "Tr?????c",
          next: "Ti???p",
          last: "Cu???i"
        },
      },
      columns: [
        {
          title: 'STT',
          width: '4vh',
          className: "dt-center"
        },
        {
          title: 'H??? v?? t??n',
          className: "dt-center"
        },
        {
          title: 'S??? ??i???n tho???i',
          className: "dt-center"
        },
        {
          title: '?????a ch???',
          className: "dt-center"
        },
        {
          title: 'Email',
          className: "dt-center"
        },
        {
          title: 'CCCD',
          className: "dt-center"
        },
        {
          title: 'Gi???i t??nh',
          className: "dt-center"
        },
        {
          title: 'Ng??y sinh',
          className: "dt-center"
        },
        {
          title: 'Khoa',
          className: "dt-center"
        },
        {
          title: 'Tr?????ng',
          className: "dt-center"
        },
        {
          title: 'Thao t??c',
          className: "dt-center"
        },
      ],
    };
    this.GetAll();
  }

  GetAll() {
    this.SinhVien.Load_List(this.Token).subscribe(
      (res) => {
        this.dataTable = res.Data;
        this.dtTrigger.next();
        this.Khoa.Load_List(this.Token).subscribe(
          (res) => {
            this.dataKhoa = res.Data;
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
    this.selected_ID = Data.ID_sinh_vien;
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
          ID_khoa: '',
        })
        this.checkInsert = true;
        this.titleModal = "Th??m m???i";
      }
      if(type=="Update") {
        this.checkInsert =false;
        this.titleModal = "c???p nh???t";
        this.Insert.patchValue({
          Ho_ten: Data.Ho_ten,
          Dia_chi: Data.Dia_chi,
          Email: Data.Email,
          So_dien_thoai: Data.So_dien_thoai,
          CCCD: Data.CCCD,
          Gioi_tinh: Data.Gioi_tinh,
          Ngay_sinh: Data.Ngay_sinh.substring(0,10),
          ID_khoa: Data.ID_khoa,
        });
      }
      if (type == "Delete") {
        this.selected_ID = Data.ID_sinh_vien;
      }
  }

  Delete() {
    this.SinhVien.Delete(this.selected_ID, this.Token)
      .subscribe(z => {
        this.modalService.dismissAll('DeleteModal');
        if (z.Status == 2) {
          this.spinner.show();
          this.toastr.warning(z.Message);
          this.spinner.hide();
        } else if (z.Status == 1) {
          this.spinner.show();
          this.toastr.success("X??a th??nh c??ng !");
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
            'B???n kh??ng c?? quy???n s??? d???ng ch???c n??ng n??y, vui l??ng li??n h??? v???i qu???n tr??? vi??n ????? ???????c h??? tr???!'
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
      ID_sinh_vien: this.selected_ID,
      Ho_ten: this.Insert.value.Ho_ten,
      Dia_chi: this.Insert.value.Dia_chi,
      Email: this.Insert.value.Email,
      So_dien_thoai: this.Insert.value.So_dien_thoai,
      CCCD: this.Insert.value.CCCD,
      Gioi_tinh: this.Insert.value.Gioi_tinh,
      Ngay_sinh: this.Insert.value.Ngay_sinh,
      ID_khoa: this.Insert.value.ID_khoa,
    }
    this.spinner.show();
    if(this.checkInsert){
      this.SinhVien.Insert(req,this.Token).subscribe((res)=>{
        if (res.Status == 2) {
          this.toastr.warning(res.Message);
          this.spinner.hide();
        } else if (res.Status == 1) {
          this.toastr.success(res.Message);
          this.spinner.hide();
        } else if (res.Status == 4) {
          this.toastr.error('Th??m m???i th???t b???i!');
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
            'B???n kh??ng c?? quy???n s??? d???ng ch???c n??ng n??y, vui l??ng li??n h??? v???i qu???n tr??? vi??n ????? ???????c h??? tr???!'
          );
        }
      })
    }else{
      this.SinhVien.Update(req,this.Token).subscribe((res)=>{
        if (res.Status == 2) {
          this.toastr.warning(res.Message);
          this.spinner.hide();
        } else if (res.Status == 1) {
          this.toastr.success(res.Message);
          this.spinner.hide();
        } else if (res.Status == 4) {
          this.toastr.error('C???p nh???t th???t b???i!');
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
            'B???n kh??ng c?? quy???n s??? d???ng ch???c n??ng n??y, vui l??ng li??n h??? v???i qu???n tr??? vi??n ????? ???????c h??? tr???!'
          );
        }
      })
    }
  }
}
