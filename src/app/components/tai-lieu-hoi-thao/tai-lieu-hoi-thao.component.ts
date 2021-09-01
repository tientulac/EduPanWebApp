import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { common } from 'src/app/app.common';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators, MaxLengthValidator, } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataTablesModule } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { formatValidator } from '@angular-devkit/schematics/src/formats/format-validator';
import { forEach } from '@angular-devkit/schematics';
import { timeout } from 'rxjs/operators';
import { AbstractControl } from '@angular/forms';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { TaiLieuHoiThaoService } from 'src/app/utils/services/DanhMucService/TaiLieuHoiThao.service';

export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
}

@Component({
  selector: 'app-tai-lieu-hoi-thao',
  templateUrl: './tai-lieu-hoi-thao.component.html',
  styleUrls: ['./tai-lieu-hoi-thao.component.scss']
})
export class TaiLieuHoiThaoComponent implements OnInit {
  @Input() ID_hoi_thao: any;
  Mo_ta: string

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

  constructor(
    private modalService: NgbModal,
    private TaiLieuHoiThao: TaiLieuHoiThaoService,
    private fb: FormBuilder,
    public router: Router,
    private fromBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.com = new common(this.router);
    this.com.CheckLogin();
    var a = this.com.getUserinfo();
    this.Token = a.Token;
    this.GetAll()
  }

  GetAll() {
    this.TaiLieuHoiThao.Load_List(this.ID_hoi_thao,this.Token)
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
    this.selected_ID = Data.ID_tai_lieu;
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
        this.titleModal = "Thêm mới";
      }
      if (type == "Delete") {
        this.selected_ID = Data.ID_tai_lieu;
      }
  }

  public uploader: FileUploader = new FileUploader({
    disableMultipart: false,
    itemAlias: 'attachment'
  });

  onSubmit() {
    let dataBase64: any;
    let fileCount: number = this.uploader.queue.length;
    let checkSize: number
    let nameFile
    if (fileCount > 0) {
      if (fileCount > 1) {
        this.uploader.removeFromQueue(this.uploader.queue[0]);
      }
      this.uploader.queue.forEach((val, i, array) => {
        let fileReader = new FileReader()
        fileReader.onloadend = (e) => {
          dataBase64 = fileReader.result
          dataBase64 = dataBase64.split("base64,")[1]
          checkSize = val.file.size
          nameFile = val.file.name
       
          if (checkSize > 20971520) {
            this.toastr.warning("Tài liệu không được quá 20MB!")
            return false
          }
          let req = {
            ID_hoi_thao: this.ID_hoi_thao,
            FileName: nameFile,
            Mo_ta: this.Mo_ta,
            fileBase64: dataBase64
          }
          this.TaiLieuHoiThao.Insert(req,this.Token).subscribe((res)=>{
            if (res.Status == 2) {
              this.toastr.warning(res.Message);
            } else if (res.Status == 1) {
              this.toastr.success(res.Message);
            } else if (res.Status == 4) {
              this.toastr.error('Thêm mới thất bại!');
            }else{
              this.toastr.warning(res.Message);
            }
            this.modalService.dismissAll('InsertModal');
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
        fileReader.readAsDataURL(val._file);
      });
    } else {
      this.toastr.warning("Bạn chưa chọn tài liệu tải lên!")
    }
  }

  Delete() {
    this.TaiLieuHoiThao.Delete(this.selected_ID, this.Token).subscribe((res) => {
      if (res.Status == 2) {
        this.toastr.warning(res.Message);
      } else if (res.Status == 1) {
        this.toastr.success(res.Message);
      } else if (res.Status == 4) {
        this.toastr.error('Xoá thất bại!');
      }else{
        this.toastr.warning(res.Message);
      }
      this.modalService.dismissAll('InsertModal');
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
