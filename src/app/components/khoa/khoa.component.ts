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
          title: 'M?? khoa',
          className: "dt-center"
        },
        {
          title: 'T??n khoa',
          className: "dt-center"
        },
        {
          title: 'Tr?????ng h???c',
          className: "dt-center"
        },
        {
          title: 'Thao t??c',
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
        this.titleModal = "Th??m m???i";
      }
      if(type=="Update") {
        this.checkInsert =false;
        this.titleModal = "c???p nh???t";
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
      this.KhoaService.Update(req,this.Token).subscribe((res)=>{
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
