import {Injectable} from '@angular/core';
import {Restangular} from 'ng2-restangular'; 
import { ConfigService } from "../../config/config.service";

@Injectable()
export class SpontaneousPaymentService {
  commission: any;
  spontaneousPaymentList;
  spontaneous;
 
   constructor(private restangular: Restangular, private configServ: ConfigService) {
     this.spontaneousPaymentList= this.restangular.one(configServ.getApiVersion()).one('pagos/servicio');
     this.commission= this.restangular.one(configServ.getApiVersion()).one('comisiones/calcular_comision');
     this.spontaneous= this.restangular.one(configServ.getApiVersion()).one('pagos');
  }
    getPayableServices(Id){
        return this.spontaneousPaymentList.one(Id +'.json').get();
   }
   getCommissionPay(monto,id,metodo){
        return this.commission.one('.json').get({servicio_id: id,monto: monto , metodo_pago: metodo});
   }
   addSpontaneousPay(data){
       return this.spontaneous.one('.json').customPOST(data);
   }
} 