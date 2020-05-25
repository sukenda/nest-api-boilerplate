export class Response {

  accessToken?: string;

  message?: string;

  statusCode?: number;

  data?: any;

  constructor(builder: ResponseBuilder) {
    this.accessToken = builder.accessToken;
    this.message = builder.message;
    this.statusCode = builder.statusCode;
    this.data = builder.data;
  }

}

export class ResponseBuilder {
  private _accessToken: string;
  private _message: string;
  private _statusCode: number = 0;
  private _data: any;

  public build() {
    return new Response(this);
  }

  get accessToken(): string {
    return this._accessToken;
  }

  setAccessToken(token: string) {
    this._accessToken = token;
    return this;
  }

  get message(): string {
    return this._message;
  }

  setMessage(message: string) {
    this._message = message;
    return this;
  }

  get statusCode(): number {
    return this._statusCode;
  }

  setStatusCode(value: number) {
    this._statusCode = value;
    return this;
  }

  get data(): any {
    return this._data;
  }

  setData(value: any) {
    this._data = value;
    return this;
  }

}
