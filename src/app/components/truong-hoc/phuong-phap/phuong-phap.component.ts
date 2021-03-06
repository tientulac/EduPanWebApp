import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { common } from 'src/app/app.common';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators, MaxLengthValidator, AbstractControl, } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { TruongHocService } from 'src/app/utils/services/DanhMucService/TruongHoc.service';
import { PhuongPhapNghienCuuService } from 'src/app/utils/services/DanhMucService/PhuongPhapNghienCuu.service';

@Component({
  selector: 'app-phuong-phap',
  templateUrl: './phuong-phap.component.html',
  styleUrls: ['./phuong-phap.component.scss']
})
export class PhuongPhapComponent implements OnInit {

  @Input() ID_truong: any;

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

  dataPhuongPhap: any;
  phuongphapSearch: any;
  itemSelected: boolean = false;
  dataPhuongPhapFilter: any;


  constructor(
    public spinner: NgxSpinnerService,
    private modalService: NgbModal,
    public router: Router,
    private fromBuilder: FormBuilder,
    private toastr: ToastrService,
    private TruongHoc: TruongHocService,
    private PhuongPhap: PhuongPhapNghienCuuService
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
          title: 'Ph????ng nghi??n c???u',
          className: "dt-center"
        },
        {
          title: 'Ng??y t???o',
          className: "dt-center"
        },
        {
          title: 'Tr???ng th??i',
          className: "dt-center"
        },
        {
          title: 'T??c gi???',
          className: "dt-center"
        },
        {
          title: 'Thao T??c',
          className: "dt-center"
        },
      ],
    };
    this.GetAll();
  }

  GetAll() {
    this.TruongHoc.Load_PhuongPhap(this.ID_truong,this.Token)
      .subscribe(z => {
        this.dataTable = z.Data;
        this.dtTrigger.next();
        this.PhuongPhap.Load_List(this.Token).subscribe(
          (res) => {
            this.dataPhuongPhap = res.Data;
            this.dataPhuongPhapFilter = res.Data;
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
    this.selected_ID = Data.ID_th_pp;
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
        this.itemSelected = false;
        this.checkInsert = true;
        this.titleModal = "Th??m m???i";
        for (var i = 0; i < this.dataPhuongPhap.length; i++) {
          this.dataPhuongPhap[i].checked = this.dataTable.map(x => x.ID_phuong_phap).includes(this.dataPhuongPhap[i].ID_phuong_phap) ? true : false;
        }
      }
      if (type == "Delete") {
        this.selected_ID = Data.ID_th_pp;
      }
  }

  Delete() {
    this.TruongHoc.Delete_PhuongPhap(this.selected_ID, this.Token)
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

  onSubmit() {
    var lst_isnert = this.dataPhuongPhapFilter.filter(value=>value.checked==true).map(
      (x) => x.ID_phuong_phap
    );   
    let req = {
      ID_truong: this.ID_truong,
      lst_ID_phuong_phap: lst_isnert
    }
    this.spinner.show();
    if(this.checkInsert){
      this.TruongHoc.Insert_PhuongPhap(req,this.Token).subscribe((res)=>{
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
    }
  }

  changePhuongPhap() {
    if (this.phuongphapSearch != '') {
      this.dataPhuongPhap = this.dataPhuongPhapFilter.filter(x => this.xoa_dau(x.Ten_cong_trinh.toLowerCase()).includes(this.xoa_dau(this.phuongphapSearch.toLowerCase())));
      this.itemSelected = this.dataPhuongPhap.length == this.dataPhuongPhapFilter.length ? true : false;
    }
    else {
      this.dataPhuongPhap = this.dataPhuongPhapFilter;
      this.itemSelected = false;
    }
  }

  checkUncheckAll() {
    for (var i = 0; i < this.dataPhuongPhap.length; i++) {
      this.dataPhuongPhap[i].checked = this.itemSelected;
    }
  }

  xoa_dau(str) {
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'a');
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'e');
    str = str.replace(/??|??|???|???|??|???/g, 'i');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'o');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'u');
    str = str.replace(/???|??|???|???|???/g, 'y');
    str = str.replace(/??/g, 'd');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'A');
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'E');
    str = str.replace(/??|??|???|???|??/g, 'I');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'O');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'U');
    str = str.replace(/???|??|???|???|???/g, 'Y');
    str = str.replace(/??/g, 'D');
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // huy???n, s???c, h???i, ng??, n???ng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // m?? ?? (??), m?? ??, m?? ?? (??)
    return str;
  }
}
