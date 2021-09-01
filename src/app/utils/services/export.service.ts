import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {Buffer} from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }
  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';

  public exportExcel(jsonData: any[], fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, fileName);
  }
  public exportExcelByte(input: any, fileName: string): void {
    let buff = new Buffer(input, 'base64');
    let text = buff.toString('ascii');
    const data: Blob = new Blob([buff], { type: this.fileType });
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }
  public GetBase64(input: any, fileName: string): any {
    let buff = new Buffer(input, 'base64');
    return buff.toString('base64');
  }
  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.fileType });
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }

  public exportWordByte(input: any, fileName: string): void {
    let buff = new Buffer(input, 'base64');
    let text = buff.toString('ascii');
    const data: Blob = new Blob([buff], { type: this.fileType });
    FileSaver.saveAs(data, fileName + '.doc');
  }
}
