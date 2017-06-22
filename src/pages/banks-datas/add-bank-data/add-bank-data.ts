import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BanksDataService } from "../banks-data.service";
@Component({
  selector: 'page-add-bank-data',
  templateUrl: 'add-bank-data.html'
})
export class AddBankDataPage {
  data: any; 
  banks: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public banksDataServ: BanksDataService) {}

  ionViewWillEnter(){
    this.banksDataServ.getBanks().subscribe( res => {
            this.banks = res.data;
    });
  }
  onAddBankData(form){
    this.data = { DatosBancarios: form.value };
    this.banksDataServ.addBanksData(this.data).subscribe( res => {
      if(res.message.code == "success"){
        this.navCtrl.pop(); 
      }
    });
  }

}
