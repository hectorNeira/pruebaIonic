import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AddBankDataPage } from "../../banks-datas/add-bank-data/add-bank-data";
import { BanksDataService } from "../../banks-datas/banks-data.service";
import { TransferService } from "../transfer.service";


@Component({
  selector: 'page-transfer-detail',
  templateUrl: 'transfer-detail.html'
})
export class TransferDetailPage {
  banks: any;

  transferId;
  transferDetail;
  constructor(public navCtrl: NavController, public navParams: NavParams, public transferServ: TransferService, public alerCtrl: AlertController, public banksDataServ: BanksDataService) {

    this.transferId = navParams.get("transferId");
  }

  ionViewWillEnter(){
    this.transferServ.getTransferDetail(this.transferId).subscribe(res => {
      this.transferDetail= res.data;
    });
  }

  onCancel(){
         let confirm = this.alerCtrl.create({
      title: 'Cancelar transferencia',
      message: '¿Desea cancelar la transferencia?',
      buttons: [
        {
          text: 'No',
          handler: () => {
          }
        },
        {
          text: 'Si',
          handler: () => {
            this.transferServ.cancelTransfer(this.transferId).subscribe(res => {
              if(res.message.code="success"){
                this.navCtrl.pop();
              }
            });
          }
        }
      ]
    });
    confirm.present();
  }

  doRadio() {
    let alert = this.alerCtrl.create();
    alert.setTitle('Selecciona cuenta bancaria');
     this.banksDataServ.getBanksList().subscribe( res => {
       if(!res.message){
          this.banks = res.data;
             for(let bank of this.banks){
               alert.addInput({
                 type: 'radio',
                 label: bank.DatosBancario.nombre,
                 value: bank.DatosBancario.id,
                 checked: false
             });
           }
       }
               alert.addButton({
                text: 'Agregar nueva',
                handler: data => {
                  this.navCtrl.push(AddBankDataPage);
                }
              });
              alert.addButton({
                text: 'Aceptar',
                handler: data => {
                  let putData = { Transferencia: { datos_bancarios_id: data } }
                  this.transferServ.putTransfer(this.transferId, putData).subscribe(res => {
                    if(res.message.code="success"){
                      this.navCtrl.pop();
                    }
                  });
                }
              });
        alert.present();         
      });
  }

}
