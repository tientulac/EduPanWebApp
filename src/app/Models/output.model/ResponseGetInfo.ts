import { ResponseBase } from './ResponseBase';

export class ResponseGetInfo extends ResponseBase {
  Data: TeacherInfo;
}
export class TeacherInfo {
  Ma_cb: string;
  Ho_ten: number;
  Ngay_sinh: string;
  So_dien_thoai: string;
  Email: string;
  Dia_chi_lien_he: string;
}
