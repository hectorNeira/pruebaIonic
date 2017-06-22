import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TransferDetailPage } from "../transfer-detail/transfer-detail";
import { TransferService } from "../transfer.service";


@Component({
  selector: 'page-transfer-list',
  templateUrl: 'transfer-list.html'
})
export class TransferListPage {

  transferList;
  statusId = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public transferServ: TransferService) {}

  ionViewWillEnter(){
    this.transferServ.getTransferList(this.statusId).subscribe(res => {
      this.transferList = res.data;
    });
  }

  onChangeStatus(event){
    this.statusId = event;
    this.ionViewWillEnter()
  }

  onViewDetail(transferId){
    this.navCtrl.push(TransferDetailPage, { transferId: transferId })
  }
}
