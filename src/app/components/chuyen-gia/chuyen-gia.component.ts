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
          title: 'H???c h??m',
          className: "dt-center"
        },
        {
          title: 'H???c v???',
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
          title: 'Ph????ng ph??p n???i b???t',
          className: "dt-center"
        },
        {
          title: 'C??n tr??nh n???i b???t',
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
        this.titleModal = "Th??m m???i";
      }
      if(type=="Update") {
        this.checkInsert =false;
        this.titleModal = "c???p nh???t";
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
      this.ChuyenGia.Update(req,this.Token).subscribe((res)=>{
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
