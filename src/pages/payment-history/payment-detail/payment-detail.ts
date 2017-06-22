import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PaymentHistoryService } from "../payment-history.service";

@Component({
  selector: 'page-payment-detail',
  templateUrl: 'payment-detail.html'
})
export class PaymentDetailPage {
    details: any;
    paymentHistoryId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public PaymentHistoryServ: PaymentHistoryService) {
        this.paymentHistoryId= this.navParams.get("id");
        //se recibe el parametro de id
  	    PaymentHistoryServ.getDetailPaymentHistory(this.paymentHistoryId).subscribe( res => {
            this.details = res.data.DetallePago;
     });
  }



}
