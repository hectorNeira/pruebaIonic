import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PayableServicesService } from "./payable-services.service";
import { SpontaneousPaymentPage } from "../spontaneous-payment/spontaneous-payment";

@Component({
  selector: 'page-payable-services',
  templateUrl: 'payable-services.html'
})
export class PayableServicesPage {
  payableList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public payableServicesServ: PayableServicesService) {}

  ionViewWillEnter(){
        this.payableServicesServ.getPayableServices().subscribe( res => {
              this.payableList = res.data;

      });
    }
    idPayable(Id){
    this.navCtrl.push(SpontaneousPaymentPage,{Id});
  }
    
}
