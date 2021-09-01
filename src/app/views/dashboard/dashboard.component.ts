import { Component, OnInit } from '@angular/core';
import { common } from 'src/app/app.common';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import * as CanvasJS from './canvasjs.min';
import * as Canvas from './canvasjs.min.js';
import { Title } from '@angular/platform-browser';
import { SinhVienService } from 'src/app/utils/services/DanhMucService/SinhVien.service';
import { HoiThaoService } from 'src/app/utils/services/DanhMucService/HoiThao.service';
import { TruongHocService } from 'src/app/utils/services/DanhMucService/TruongHoc.service';
import { TrungTamService } from 'src/app/utils/services/DanhMucService/TrungTam.service';
import { ChuyenGiaService } from 'src/app/utils/services/DanhMucService/ChuyenGia.service';
import { LoaiService } from 'src/app/utils/services/DanhMucService/Loai.service';
import { HocBongSinhVienService } from 'src/app/utils/services/DanhMucService/HocBongSinhVien.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  data: any
  Token: any
  chart: any

  dataSinhVien: any;
  dataHoiThao: any;
  dataTruongHoc: any;
  dataTrungTam: any;
  dataChuyenGia: any;
  dataLoaiHocBong: any;
  dataHocBongSinhVien: any;
  dataChart: any;

  count_sinh_vien: any;
  count_hoi_thao: any;
  count_truong_hoc: any;
  count_trung_tam: any;
  count_chuyen_gia: any;
  count_loai_hoc_bong: any;

  Player = [];  
  Run = [];  
  Linechart = [];  

  public com: common;


  constructor(
    public router: Router,
    private titleService: Title,
    private SinhVien: SinhVienService,
    private HoiThao: HoiThaoService,
    private TruongHoc: TruongHocService,
    private TrungTam: TrungTamService,
    private ChuyenGia: ChuyenGiaService,
    private LoaiHocBong: LoaiService,
    private HocBongSinhVien: HocBongSinhVienService
  ) {}

  ngOnInit() {
    this.com = new common(this.router);
    this.com.CheckLogin();
    var a = this.com.getUserinfo();
    this.Token = a.Token;
    this.titleService.setTitle('Trang chủ | EduPan');
    this.GetAll();
  }

  GetAll() {
    this.SinhVien.Load_List(this.Token).subscribe(
      (res) => {
        this.dataSinhVien = res.Data;
        this.count_sinh_vien = this.dataSinhVien.length;
        this.HoiThao.Load_List(this.Token).subscribe(
          (res) => {
            this.dataHoiThao = res.Data;
            this.count_hoi_thao = this.dataHoiThao.length;
            this.TruongHoc.Load_List(this.Token).subscribe(
              (res) => {
                this.dataTruongHoc = res.Data;
                this.count_truong_hoc = this.dataTruongHoc.length;
                this.TrungTam.Load_List(this.Token).subscribe(
                  (res) => {
                    this.dataTrungTam = res.Data;
                    this.count_trung_tam = this.dataTrungTam.length;
                    this.ChuyenGia.Load_List(this.Token).subscribe(
                      (res) => {
                        this.dataChuyenGia = res.Data;
                        this.count_chuyen_gia = this.dataChuyenGia.length;
                        this.LoaiHocBong.LoaiHocBong_Load_List(this.Token).subscribe(
                          (res) => {
                            this.dataLoaiHocBong = res.Data;
                            this.count_loai_hoc_bong = this.dataLoaiHocBong.length;
                            this.HocBongSinhVien.Load_List(this.Token).subscribe(
                              (res) => {
                                this.dataHocBongSinhVien = res.Data;
                                var dtfUS = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit',hour: '2-digit',minute: '2-digit'}); 
                                var y = new Date().getFullYear();
                                var d = dtfUS.format(new Date());
                                var m = parseInt(d.toString().substring(0, d.indexOf('/')))-3;
                                this.dataChart = this.dataSinhVien.filter(x => 
                                  parseInt(x.Ngay_cap.toString().substring(0, d.indexOf('/'))) >= m &&
                                  x.Ngay_cap.toString().includes(y.toString())
                                );        
                                this.Linechart = new Chart('canvas', {  
                                  type: 'bar',  
                                  data: {  
                                    labels: this.dataChart.map(x => x.Ho_ten),  
                            
                                    datasets: [  
                                      {  
                                        data: this.dataChart.map(x => x.Count_hoc_bong),  
                                        borderColor: '#3cb371',  
                                        backgroundColor: "#17a2b8",  
                                      }  
                                    ]  
                                  },  
                                  options: {  
                                    legend: {  
                                      display: false  
                                    },  
                                    scales: {  
                                      xAxes: [{  
                                        display: true  
                                      }],  
                                      yAxes: [{  
                                        display: true  
                                      }],  
                                    }  
                                  }  
                              });                                         
                            })
                          }
                        );
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  }
}
