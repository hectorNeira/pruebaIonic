import {Injectable} from '@angular/core';
import {Restangular} from 'ng2-restangular'; 
import { ConfigService } from "../../config/config.service";

@Injectable()
export class PaymentHistoryService {
    paymentHistoryList;
 
   constructor(private restangular: Restangular, private configServ: ConfigService) {
     this.paymentHistoryList= this.restangular.one(configServ.getApiVersion()).one('pagos');
    }
    getPaymentHistory(anio, month){
        return this.paymentHistoryList.one('.json?anio='+anio+'&mes='+month).get();
    }
    getDetailPaymentHistory(paymentHistoryId){
     return this.paymentHistoryList.one(paymentHistoryId+'.json').get();
    }
} 
