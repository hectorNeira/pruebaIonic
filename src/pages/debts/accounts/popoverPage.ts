import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ViewController, PopoverController, AlertController } from 'ionic-angular';
import { AccountsService } from "../accounts.service";
import { EditAccountPage } from "../edit-account/edit-account";



@Component({
  template: `
    <ion-list>
      <button *ngIf="showMarkAsPaid()" ion-item (click)="marcar_pagado()"><ion-icon name="md-checkmark"></ion-icon> {{texto}}</button>
      <button ion-item (click)="gotoEditar()"><ion-icon name="md-create"></ion-icon> Editar</button>
      <button *ngIf="accountHtml.Adeudo && accountHtml.Adeudo[0].filename" ion-item (click)="close()"><ion-icon name="md-document"></ion-icon> Ver recibo</button>
      <button ion-item (click)="eliminar_servicio()"><ion-icon name="md-trash"></ion-icon> Eliminar</button>
    </ion-list>
  `
})

export class PopoverPage {

  accountHtml;
  accountDebts;
  debtId;
  status;
  texto: string;
  refresh;
  
  constructor(public viewCtrl: ViewController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public accountServ: AccountsService ) {
        this.accountHtml= this.viewCtrl.data.account;
        
        
         if(this.accountHtml.Adeudo && this.accountHtml.Adeudo[0].pagado) {  
            this.texto="Desmarcar Pagado";            
          } else {  
            this.texto="Marcar Pagado";
          }
    }

    ionViewWillEnter(){
      if(this.refresh){
        this.viewCtrl.dismiss(true);
      }
    }


    showMarkAsPaid(){
      if(this.accountHtml.Adeudo){
        if(this.accountHtml.Adeudo[0].pagado && this.accountHtml.Adeudo[0].pago_id != null){
          return false;
        }else{
          return true;
        }
      }
    }
    
  close() {
    this.viewCtrl.dismiss();
  }

  marcar_pagado(){
    this.viewCtrl.dismiss(true);
    this.accountServ.mark_paid(this.accountHtml.Adeudo[0].id, this.accountHtml.Adeudo[0].pagado);
  }

  gotoEditar(){
    this.navCtrl.push(EditAccountPage,{endpoint: "cuentas/"+this.accountHtml.Cuenta.id, action: "Editar"});
    this.refresh=true;
    //this.viewCtrl.dismiss();

  }

 

  eliminar_servicio(){
    let confirm = this.alertCtrl.create({
      title: 'Se eliminará la cuenta seleccionada.',
      message: '¿Desea continuar?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.accountServ.delet_account(this.accountHtml.Cuenta.id).subscribe( res => {
              if(res.message.code == "success"){
                this.viewCtrl.dismiss(true);
              }
            });
          }
        }
      ]
    });
    confirm.present();
  }

}