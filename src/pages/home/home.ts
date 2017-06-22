import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DebtsHistoryPage } from "../debts/debts-history/debts-history";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {}

  debtsHistory(){
   this.navCtrl.push(DebtsHistoryPage);
 }

}
