import { Component } from '@angular/core';
import { NavParams, NavController } from "ionic-angular";
import { BankAccountsService } from "../../bank-accounts/bank-accounts.service";

@Component({
  selector: 'page-validate-bank',
  templateUrl: 'validate-bank.html'
})
export class ValidateBankPage {

  url;
  cuentaBancaria;

  constructor(public navParams: NavParams, public bankAccountsServ: BankAccountsService, public navCtrl: NavController) {
    this.url = this.navParams.get("endpoint");
    this.bankAccountsServ.getBankAccountDetail(this.url).subscribe( res => {
      this.cuentaBancaria = res.data.CuentaBancaria;
     });
  }

  onValidate(form){
    this.bankAccountsServ.postBankAccountDetail(this.url, form.value).subscribe( res => {
      if(res.message.code == "success"){
        this.navCtrl.popToRoot();
      }else if(res.message.title == "Lo sentimos, haz excedido el número de intentos por lo que tu cuenta fue bloqueada."){
        this.navCtrl.pop();
      }
     });
  }

}
