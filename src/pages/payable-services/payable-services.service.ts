import {Injectable} from '@angular/core';
import {Restangular} from 'ng2-restangular'; 
import { ConfigService } from "../../config/config.service";

@Injectable()
export class PayableServicesService {
    payableServicesList;
 
   constructor(private restangular: Restangular, private configServ: ConfigService) {
     this.payableServicesList= this.restangular.one(configServ.getApiVersion()).one('pagos/servicios');
  }
    getPayableServices(){
        return this.payableServicesList.one('.json').get();
   }
} 