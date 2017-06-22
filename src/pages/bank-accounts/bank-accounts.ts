import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { BankAccountsService } from "./bank-accounts.service";
import { ValidateBankPage } from "../banks/validate-bank/validate-bank";
import { AddBankPage } from "../add-bank/add-bank";

@Component({
  selector: 'page-bank-accounts',
  templateUrl: 'bank-accounts.html'
})
export class BankAccountsPage {
  banks

  constructor(public viewCtrl: ViewController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public bankAccountsServ: BankAccountsService) {}
   ionViewWillEnter(){
    this.bankAccountsServ.getBankAccount().subscribe( res => {
            this.banks = res.data;
     });
   }

   bankAccountDelete(id){
     let confirm = this.alertCtrl.create({
      title: 'Se eliminará la cuenta bancaria seleccionada.',
      message: '¿Desea continuar?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.bankAccountsServ.deleteBankAccount(id).subscribe( res => {
              if(res.message.code == "success"){
                this.ionViewWillEnter();
              }
            });
          }
        }
      ]
    });
    confirm.present();
    }

   gotoValidate(bankId){
     this.navCtrl.push(ValidateBankPage, {endpoint: "cuentas_bancarias/" + bankId + ".json"});
   }

   gotoAddBank(){
     this.navCtrl.push(AddBankPage);
   }
}
