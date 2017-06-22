import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AccountsService } from "../accounts.service";
import { DebtsPdfPage } from "./debts-pdf/debts-pdf";

@Component({
  selector: 'page-debts-history',
  templateUrl: 'debts-history.html'
})
export class DebtsHistoryPage {

  debtsHistoryHtml: string;
  date = { 
    month: new Date().toISOString()
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public accountServ: AccountsService, public modalCtrl: ModalController) {}

  ionViewWillEnter(){

    let anio = this.date.month.substring(0,4);
    let month = this.date.month.substring(5,7);

    this.accountServ.getDebtsHistory(anio, month).subscribe( res => {
            this.debtsHistoryHtml=res.adeudos;
        });
  }
  viewPdf(url){
    let modal = this.modalCtrl.create(DebtsPdfPage, {url});
    modal.present();
  }
}
