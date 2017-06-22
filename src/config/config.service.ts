import {Injectable} from '@angular/core';


@Injectable()
export class ConfigService {

  private apiKey = "53f6375073d88a432117580263fdd3eaad89";
  private secret = "261ca729c7faf3268e44692ea72c96329b7f59e4c30c35331fc7ff39d1889a41";
  private apiVersion = "v1";
  private grantType = "password";
  


  constructor() {}

  public getApiKey(){
      return this.apiKey;
  }

  public getSecret(){
    return this.secret;
  }

  public getApiVersion(){
    return this.apiVersion;
  }

  public getGrant(){
    return this.grantType;
  }

}