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
          title: 'M?? ph??ng',
          className: "dt-center"
        },
        {
          title: 'T??n ph??ng',
          className: "dt-center"
        },
        {
          title: 'S???c ch???a',
          className: "dt-center"
        },
        {
          title: 'S??? h??ng',
          className: "dt-center"
        },
        {
          title: 'S??? c???t',
          className: "dt-center"
        },
        {
          title: 'H???i th???o',
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
        this.titleModal = "Th??m m???i";
      }
      if(type=="Update") {
        this.checkInsert =false;
        this.titleModal = "c???p nh???t";
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
      this.PhongHop.Update(req,this.Token).subscribe((res)=>{
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
