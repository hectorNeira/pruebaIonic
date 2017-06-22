import {Injectable} from '@angular/core';
import {Restangular} from 'ng2-restangular'; 
import { ConfigService } from "../../config/config.service";

@Injectable()
export class BankAccountsService {
apiVersion;
banksList: any;
bankAccounts;
 
   constructor(private restangular: Restangular, private configServ: ConfigService) {
     this.apiVersion = this.restangular.one(configServ.getApiVersion());
     this.banksList = this.restangular.one(configServ.getApiVersion()).one('bancos.json');
     this.bankAccounts = this.restangular.one(configServ.getApiVersion()).one('cuentas_bancarias');
  }
    getBankAccount(){
        return this.bankAccounts.one('.json').get();
   }

   getActiveBankAccounts(){
        return this.bankAccounts.one('.json').get({estatus: "activa"});
   }

   getBankAccountDetail(url){
        return this.apiVersion.one(url).get();
   }

   postBankAccountDetail(url, data){
        return this.apiVersion.one(url).customPUT(data, undefined, undefined, { 'Content-Type': 'application/javascript' });
   }

    addBank(data){
        return this.bankAccounts.one('.json').customPOST(data);
   }
    getBanks(){
        return this.banksList.get();
    }

   deleteBankAccount(idBankAccount){
      return this.bankAccounts.one(idBankAccount+'.json').remove();
   }
} 