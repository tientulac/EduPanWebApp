import { RequestBase } from './RequestBase';

export class RequestRegister extends RequestBase {
  UserName: string;
  Email: string;
  UserCategory: number;
}
