import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { BanksDataService } from "../banks-data.service";
import { AddBankDataPage } from "../add-bank-data/add-bank-data";

@Component({
  selector: 'page-banks-data',
  templateUrl: 'banks-data.html'
})
export class BanksDataPage {
  banks: any;
  addBankDataPage = AddBankDataPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public banksDataServ:BanksDataService, public alertCtrl: AlertController) {}

  ionViewWillEnter(){
    this.banksDataServ.getBanksList().subscribe( res => {
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
            this.banksDataServ.deleteBankAccount(id).subscribe( res => {
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
}
