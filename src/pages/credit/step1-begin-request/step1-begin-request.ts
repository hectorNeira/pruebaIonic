import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { CreditService } from "../credit.service";

@Component({
  selector: 'page-step1-begin-request',
  templateUrl: 'step1-begin-request.html'
})
export class Step1BeginRequestPage {

  amount;

  constructor(public navCtrl: NavController, public navParams: NavParams, public creditServ: CreditService) {}

  ionViewWillEnter(){
    this.amount = { monto: { minimo: 1000, maximo: 10000 } };
    /*
    this.creditServ.getAdminConfig().subscribe( res => {
        this.amount =  res.data;
      });  
      */
  }

  onRequest(form: NgForm){
    let hola = form.value;
  }

}
