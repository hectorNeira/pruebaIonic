import {Injectable} from '@angular/core';
import {Restangular} from 'ng2-restangular'; 
import { ConfigService } from "../../../config/config.service";

@Injectable()
export class DebtsPaymentService {
    debtsPayments;
 
   constructor(private restangular: Restangular, private configServ: ConfigService) {
     this.debtsPayments= this.restangular.one(configServ.getApiVersion()).one('adeudos').one('pagar.json');
  }
    getDebtsPayments(debtsIds){
        return this.debtsPayments.get({ ids: debtsIds });
   }

   payDebts(data){
     return this.debtsPayments.customPOST(data);
   }
} 