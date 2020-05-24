export class Response {

  accessToken?: string;

  statusCode?: number;

  data?: any;

  constructor(accessToken: string, statusCode: number, data: any) {
    this.accessToken = accessToken;
    this.statusCode = statusCode;
    this.data = data;
  }
}
