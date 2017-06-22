import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BankAccountsService } from "../bank-accounts/bank-accounts.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'page-add-bank',
  templateUrl: 'add-bank.html'
})
export class AddBankPage {
    select: boolean;
    banks: any;
    textoTipoDocumento: string;
    textoTipoPersonaNombre: string;
    textoTipoPersonaApellido: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public bankAccountsServ: BankAccountsService, private elementRef:ElementRef) {}
  ionViewWillEnter(){
    this.bankAccountsServ.getBanks().subscribe( res => {
            this.banks = res.data;
     });
     this.textoTipoDocumento= "Clave de elector*";
     this.textoTipoPersonaNombre= "Titular Nombre*";
     this.textoTipoPersonaApellido= "Titular Apellido*";
   }
   onAddBank(form: NgForm){
        let formData = form.value;
            formData.rango_id=8;
        this.bankAccountsServ.addBank(formData).subscribe(res => {
          var invalids = this.elementRef.nativeElement.querySelectorAll('.campo-invalido');
          for(let warning of invalids){
            warning.remove();
          }

          if(res.errors){
            for(var campo in res.errors){
              for(let msj of res.errors[campo]){
                var d1 = this.elementRef.nativeElement.querySelector('#'+campo);
                d1.insertAdjacentHTML('afterend', '<ion-item class="campo-invalido"><p>' + msj + '</p></ion-item>');
              }
            }
          }else if(res.message.code =="success"){
            this.navCtrl.pop();
          }
        });
    }
  
  setPlan(value){
    if(value == "IFE"){
      this.textoTipoDocumento = "Clave de elector*";
    }else{
      this.textoTipoDocumento = "No. de Pasaporte*";
    }
  }
  setPerson(value){
  if(value == 1){
     this.textoTipoPersonaNombre = "Titular Nombre*";
     this.textoTipoPersonaApellido = "Titular Apellido*";
    }else{
      this.textoTipoPersonaNombre = "Razón social*";
      this.textoTipoPersonaApellido = "RFC*";
     }
  }
}
