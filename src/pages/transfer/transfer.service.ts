import {Injectable} from '@angular/core';
import {Restangular} from 'ng2-restangular'; 
import { ConfigService } from "../../config/config.service";


@Injectable()
export class TransferService {

  transfers;
 
   constructor(private restangular: Restangular, private configServ: ConfigService) {
     this.transfers = this.restangular.one(configServ.getApiVersion()).one('transferencias');
  }
    getTransferList(statusId){
        return this.transfers.one(".json").get({estatus: statusId});
   }
   getTransferDetail(transferId){
        return this.transfers.one(transferId+".json").get();
   }
   cancelTransfer(transferId){
        return this.transfers.one(transferId+".json").remove();
   }
   putTransfer(transferId, data){
     return this.transfers.one(transferId+".json").customPUT(data, undefined, undefined, { 'Content-Type': 'application/javascript' });
   }
   addNewSend(data){
       return this.transfers.one('.json').customPOST(data);
   }
} 