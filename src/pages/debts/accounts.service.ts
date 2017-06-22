import {Injectable} from '@angular/core';
import {Restangular} from 'ng2-restangular';
import { ConfigService } from "../../config/config.service";
import { AuthStorageService } from "../auth/services/authStorage.service";

@Injectable()
export class AccountsService {

debts;
account;
accounts ;
services ;
debtsHistoryPage;
debtPdf;

   constructor(private restangular: Restangular, private configServ: ConfigService, private authStorageServ: AuthStorageService) {
     this.accounts= this.restangular.one(configServ.getApiVersion()).one('cuentas.json');
     this.services= this.restangular.one(configServ.getApiVersion());
     this.debts= this.restangular.one(configServ.getApiVersion()).one('adeudos');
     this.account= this.restangular.one(configServ.getApiVersion()).one('cuentas');
     this.debtsHistoryPage = this.restangular.one(configServ.getApiVersion()).one('adeudos');
     this.debtPdf = this.restangular.one(this.configServ.getApiVersion());
   }

   getAccounts(){
       return this.accounts.get({api_key: this.configServ.getApiKey()});
   }

   getServiceFields(url){
       return this.services.one(url+'.json').get();
   }

   addAccount(url, data){
       return this.services.one(url+'.json').customPOST(data);
   }

   editAccount(url, data){
       return this.services.one(url+'.json').customPOST(data);
   }

   mark_paid(debt, paid){
       if(paid){
           //desmarcar pagado
           paid = false;
       }else{
           //marcar pagado  
           paid = true;
       }
       let data = {Adeudo: {pagado: paid}};
       return this.debts.one('edit').one(debt+'.json').customPOST(data);
    }


    delet_account(accountId){
        return this.account.one('delete').one(accountId+'.json').remove();
    }

    getDebtsHistory(anio, month){
       return this.debtsHistoryPage.one('.json?mes='+month+'&anio='+anio).get();
   }

   
   getPdf(url){
       return this.debtPdf.one(url).get();
   }
}