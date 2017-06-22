import {Injectable} from '@angular/core';
import {Restangular} from 'ng2-restangular'; 
import { ConfigService } from "../../config/config.service";

@Injectable()
export class BanksDataService {
    banksData: any; 
    banksList: any;

    constructor(private restangular: Restangular, private configServ: ConfigService) {
        this.banksData= this.restangular.one(configServ.getApiVersion()).one('datos_bancarios');
        this.banksList = this.restangular.one(configServ.getApiVersion()).one('bancos.json');
    }

    getBanksList(){
        return this.banksData.one('.json').get();
    }
    deleteBankAccount(idBankAccount){
      return this.banksData.one(idBankAccount+'.json').remove();
    }
    getBanks(){
        return this.banksList.get();
    }
    addBanksData(data){
       return this.banksData.one('.json').customPOST(data);
   }
}