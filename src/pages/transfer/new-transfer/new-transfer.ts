import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Contacts } from '@ionic-native/contacts';
import { TransferService } from "../transfer.service";


@Component({
  selector: 'page-new-transfer',
  templateUrl: 'new-transfer.html'
})
export class NewTransferPage {
  cont: any;
  url: any;
  data;
  nombre;
  numero;
  constructor(public navCtrl: NavController, public navParams: NavParams, public transferService: TransferService, private contacts: Contacts,private elementRef:ElementRef,public alertCtrl: AlertController) {}
    onNewSend(form){
      let confirm = this.alertCtrl.create({
      title: 'Enviando dinero',
      message: '¿Estás seguro que quieres enviar $' + form.value.monto + ' a '+ form.value.nombre_destinatario +' con número '+ form.value.celular_destinatario +'?',
      buttons: [
        {
          text: 'No',
          handler: () => {
          }
        },
        {
          text: 'Si',
          handler: () => {
            this.data = { Transferencia: form.value };
          this.transferService.addNewSend(this.data).subscribe( res => {
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
              }else{
                if(res.message.code == "success"){
                this.navCtrl.popToRoot(); 
                }
              }
            });
          }
        }
      ]
    });
    confirm.present();
    
    }
    contact(){
      this.contacts.pickContact().then( res => {
            this.cont = res;
            this.nombre = res.displayName;
            this.numero = "";
            this.numero = res.phoneNumbers[0].value.replace(/\s/g,'');
            if(this.numero.indexOf("+") > -1){
              this.numero = this.numero.substring(4);
            }
      });
    }
    cancelTransfer(){
      let confirm = this.alertCtrl.create({
      title: 'Cancelar envio',
      message: '¿Desea cancelar el envio?',
      buttons: [
        {
          text: 'No',
          handler: () => {
          }
        },
        {
          text: 'Si',
          handler: () => {
                this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }
}
