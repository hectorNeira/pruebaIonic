import {Injectable} from '@angular/core';
import {Restangular} from 'ng2-restangular'; 
import { ConfigService } from "../../config/config.service";


@Injectable()
export class CreditService {

  credits;
 
   constructor(private restangular: Restangular, private configServ: ConfigService) {
     this.credits = this.restangular.one(configServ.getApiVersion());
  }

  getAdminConfig(){
       return this.credits.get({api_key: this.configServ.getApiKey()});
   }
} 