import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PaymentHistoryService } from "./payment-history.service";
import { PaymentDetailPage } from "./payment-detail/payment-detail";

@Component({
  selector: 'page-payment-history',
  templateUrl: 'payment-history.html'
})
export class PaymentHistoryPage {
  history;

  date = { 
    month: new Date().toISOString()
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public PaymentHistoryServ: PaymentHistoryService) {}

  ionViewWillEnter(){
    let anio = this.date.month.substring(0,4);
    let month = this.date.month.substring(5,7);

      this.PaymentHistoryServ.getPaymentHistory(anio, month).subscribe( res => {
              this.history = res.data;

      });
    }
    paymentHistorySelected(historyId){
    this.navCtrl.push(PaymentDetailPage,{id:historyId});
  }
}
