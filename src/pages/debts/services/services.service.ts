import {Injectable} from '@angular/core';
import {Restangular} from 'ng2-restangular'; 
import { ConfigService } from "../../../config/config.service";

@Injectable()
export class ServicesService {
servicesList;
 
   constructor(private restangular: Restangular, private configServ: ConfigService) {
     this.servicesList= this.restangular.one(configServ.getApiVersion()).one('cuentas').one('servicios.json');
  }
    getServices(){
        return this.servicesList.get({api_key: this.configServ.getApiKey()});
   }
} 