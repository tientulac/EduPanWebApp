import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { common } from 'src/app/app.common';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators, MaxLengthValidator, AbstractControl, } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { DanhSachHoTroService } from 'src/app/utils/services/DanhMucService/DanhSachHoTro.service';
import { LoaiService } from 'src/app/utils/services/DanhMucService/Loai.service';
import { DiaPhuongService } from 'src/app/utils/services/DanhMucService/DiaPhuong.service';

@Component({
  selector: 'app-danh-sach-ho-tro',
  templateUrl: './danh-sach-ho-tro.component.html',
  styleUrls: ['./danh-sach-ho-tro.component.scss']
})
export class DanhSachHoTroComponent implements OnInit {

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
  
  dataLoaiHoTro: any;
  dataDiaPhuong: any;

  Insert = new FormGroup({
    ID_loai: new FormControl('', [Validators.required]),
    ID_dia_phuong: new FormControl('', [Validators.required]),
    So_luong: new FormControl('', [Validators.required]),
    Trang_thai_duyet: new FormControl('', [Validators.required]),
    Thoi_gian_quyen_gop: new FormControl('', [Validators.required]),
    So_tien_mong_muon: new FormControl('', [Validators.required]),
    So_tien_ung_ho: new FormControl('', [Validators.required]),
  });

  constructor(
    public spinner: NgxSpinnerService,
    private modalService: NgbModal,
    public router: Router,
    private fromBuilder: FormBuilder,
    private toastr: ToastrService,
    private DannhSachHoTro: DanhSachHoTroService,
    private Loai: LoaiService,
    private DiaPhuong: DiaPhuongService
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
          title: 'Lo???i h??? tr???',
          className: "dt-center"
        },
        {
          title: '?????a ph????ng',
          className: "dt-center"
        },
        {
          title: 'S??? l?????ng',
          className: "dt-center"
        },
        {
          title: 'Tr???ng th??i',
          className: "dt-center"
        },
        {
          title: 'Th???i gian quy??n g??p (gi???)',
          className: "dt-center"
        },
        {
          title: 'S??? ti???n mong mu???n',
          className: "dt-center"
        },
        {
          title: 'S??? ti???n h??? tr???',
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
    this.DannhSachHoTro.Load_List(this.Token)
      .subscribe(z => {
        this.dataTable = z.Data;
        this.dtTrigger.next();
        this.Loai.LoaiHoTro_Load_List(this.Token).subscribe(
          (res) => {
            this.dataLoaiHoTro = res.Data;
            this.DiaPhuong.Load_List(this.Token).subscribe(
              (res) => {
                this.dataDiaPhuong = res.Data;
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
    this.selected_ID = Data.ID_ho_tro;
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
          Trang_thai_duyet: '',
          ID_dia_phuong: ''
        })
        this.checkInsert = true;
        this.titleModal = "Th??m m???i";
      }
      if(type=="Update") {
        this.checkInsert =false;
        this.titleModal = "c???p nh???t";
        this.Insert.patchValue({
          ID_loai: Data.ID_loai,
          ID_dia_phuong: Data.ID_dia_phuong,
          So_luong: Data.So_luong,
          Trang_thai_duyet: Data.Trang_thai_duyet,
          Thoi_gian_quyen_gop: Data.Thoi_gian_quyen_gop,
          So_tien_mong_muon: Data.So_tien_mong_muon,
          So_tien_ung_ho: Data.So_tien_ung_ho
        });
      }
      if (type == "Delete") {
        this.selected_ID = Data.ID_ho_tro;
      }
  }

  Delete() {
    this.DannhSachHoTro.Delete(this.selected_ID, this.Token)
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
      ID_ho_tro: this.selected_ID,
      ID_loai: this.Insert.value.ID_loai,
      ID_dia_phuong: this.Insert.value.ID_dia_phuong,
      So_luong: this.Insert.value.So_luong,
      Trang_thai_duyet: this.Insert.value.Trang_thai_duyet,
      Thoi_gian_quyen_gop: this.Insert.value.Thoi_gian_quyen_gop,
      So_tien_mong_muon: this.Insert.value.So_tien_mong_muon,
      So_tien_ung_ho: this.Insert.value.So_tien_ung_ho,
    }
    this.spinner.show();
    if(this.checkInsert){
      this.DannhSachHoTro.Insert(req,this.Token).subscribe((res)=>{
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
      this.DannhSachHoTro.Update(req,this.Token).subscribe((res)=>{
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
