import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DebtsPaymentService } from "./debts-payment.service";
import { BankAccountsService } from "../../bank-accounts/bank-accounts.service";
import { NgForm } from "@angular/forms";
import { PaymentDetailPage } from "../../payment-history/payment-detail/payment-detail";

@Component({
  selector: 'page-debts-payment',
  templateUrl: 'debts-payment.html'
})
export class DebtsPaymentPage {

  debtsPayment;
  bankAccounts;
  payment;
  methodIdIndex = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public debtsPaymentServ: DebtsPaymentService, public bankAccountsServ: BankAccountsService) {}

  ionViewWillEnter() {
    let selectedAccounts = this.navParams.get("selectedAccounts");
    this.debtsPaymentServ.getDebtsPayments(selectedAccounts).subscribe( res => {
                    this.debtsPayment=res.data;
                    this.bankAccountsServ.getActiveBankAccounts().subscribe( res => {
                      this.bankAccounts=res.data;
                    });
                  });

    this.payment = {Adeudos:[], MetodoDePago: { id: 0 }, CuentaBancaria: { id: null } };
    
  }

  getSubtotal(debt){
    var subtotal = +debt.Adeudo.monto_del_recibo;
    subtotal += +debt.Adeudo.comision;
    return subtotal;
  }

  showDetails(debt){
    if(debt.show){
      debt.show = false
    }else{
      debt.show = true;
    }
  }

  onPayDebt(form: NgForm){
    for(let debt of this.debtsPayment.Opciones[form.value.methodIndex].MetodoDePago.Adeudos){
      this.payment.Adeudos.push({Adeudo: {id: debt.Adeudo.id}});
    }
    this.payment.MetodoDePago.id = this.debtsPayment.Opciones[form.value.methodIndex].MetodoDePago.id;
    this.payment.CuentaBancaria.id = form.value.bankId;

    this.debtsPaymentServ.payDebts(this.payment).subscribe( res => {
      if(res.message.code == "success"){
        this.navCtrl.pop();
        this.navCtrl.push(PaymentDetailPage,{id:res.data.Pago.id});
      }
    });

  }

}
