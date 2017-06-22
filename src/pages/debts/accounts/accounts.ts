import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { PopoverPage } from "./popoverPage";
import { AccountsService } from "../accounts.service";
import { ValidateBankPage } from "../../banks/validate-bank/validate-bank";
import { DebtsPaymentPage } from "../../payment/debts-payment/debts-payment";
import { TransferListPage } from "../../transfer/transfer-list/transfer-list";
import { Step1BeginRequestPage } from "../../credit/step1-begin-request/step1-begin-request";


@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html'
})

export class AccountsPage {

  accountHtml;
  validateBankPage = ValidateBankPage;
  showCheck;
  selectedAccounts = "";
  step1BeginRequestPage = Step1BeginRequestPage;

  statusClasses;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public accountServ: AccountsService, public popoverCtrl: PopoverController, public storage: Storage) {
  }

  ionViewWillEnter(){
    this.showCheck = false;
    this.selectedAccounts = "";
    this.storage.ready().then(() => {
             this.storage.get('pendingPage').then((val) => {
                let pendingPage = val;
                if(pendingPage != null){
                  if(pendingPage.page == "ValidateBankPage"){
                    this.storage.remove('pendingPage');
                    this.navCtrl.push(ValidateBankPage, {endpoint: pendingPage.endpoint});
                  }
                }else{
                  this.accountServ.getAccounts().subscribe( res => {
                    this.accountHtml=res.data;
                  });
                }
             }); 
      });
  }

  presentPopover(myEvent, account ) {
    let popover = this.popoverCtrl.create(PopoverPage, {account:account});
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(refresh => { //al cerrarse el popover pregunta si es necesario refrescar la pagina
      if(refresh){
        this.ionViewWillEnter();
      }
    });
  }

  setClasses(account){
    this.statusClasses = {
      'payable-card': this.isPayable(account), 
      'expired-card': account.Adeudo && !this.isPayable(account) && !this.isPaid(account), 
      'paid-card': this.isPaid(account), 
      'onReview-card': this.isOnReview(account), 
      'verifying-card': (!account.Adeudo && !this.isOnReview(account)),
      'selected-card': account.Adeudo && account.Adeudo[0].selected
    }
    return this.statusClasses;
  }

  isPayable(account){
    if(account.Adeudo && account.Adeudo.length > 0){
      return  account.Adeudo[0].pagado === false && !this.estoy_vencido(account.Adeudo[0].fecha_vencimiento);
    }
  }

  isPaid(account){
    if(account.Adeudo && account.Adeudo.length > 0){
      return account.Adeudo[0].pagado === true;
    }
  }

  isOnReview(account){
    return account.Estatus.id == 5;
  }


  estoy_vencido = function( $fecha  ){
      var array = $fecha.split("-");
      if(array.length == 3){
        var fecha = new Date(array[0], (array[1] -1  ),  array[2]);
        var currentTime = new Date();
        var actualSegundos = currentTime.getTime();
        var fechaSegundos = fecha.getTime();
        if( actualSegundos >  fechaSegundos  ){
          return true;
        }
      }
      return false;
    }

  pressEvent(account, event){
    if(account.Adeudo && account.Adeudo[0].pagado === false && !this.estoy_vencido(account.Adeudo[0].fecha_vencimiento)){
      this.showCheck = true;
      account.Adeudo[0].selected = true;
      this.selectedAccounts += account.Adeudo[0].id + ",";
    }
  }

  cardClick(account){
    /*if(this.showCheck){
      if(account.Adeudo && account.Adeudo[0].pagado === false && !this.estoy_vencido(account.Adeudo[0].fecha_vencimiento)){
        if(account.Adeudo[0].selected){
          account.Adeudo[0].selected = false;
          this.checkboxClick(account);
        }else{
          account.Adeudo[0].selected = true;
          this.checkboxClick(account);
        }
      }
    }*/
  }

  checkboxClick(oneAccount){
    this.showCheck = false;
    this.selectedAccounts = "";
    for(let account of this.accountHtml){
      if(account.Adeudo && account.Adeudo[0].selected && oneAccount.Adeudo[0].pagado === false && !this.estoy_vencido(oneAccount.Adeudo[0].fecha_vencimiento)){
        this.showCheck = true;
        this.selectedAccounts += account.Adeudo[0].id + ",";
      }
    }
  }

  gotoPay(){
    this.selectedAccounts = this.selectedAccounts.substring(0, this.selectedAccounts.length-1);
    this.navCtrl.push( DebtsPaymentPage, {selectedAccounts: this.selectedAccounts});
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.ionViewWillEnter();
      refresher.complete();
    }, 1000);
  }

}
