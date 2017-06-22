import { Component } from '@angular/core';
import { NavController, NavParams, ItemSliding, Item, AlertController } from 'ionic-angular';
import { ServicesService } from "./services.service";
import { EditAccountPage } from "../edit-account/edit-account";


@Component({
  selector: 'page-services',
  templateUrl: 'services.html'
})
export class ServicesPage {
services;
selectedItemSlide;

  constructor(public navCtrl: NavController, public navParams: NavParams, public servicesServ: ServicesService,public alertCtrl: AlertController) {
  	servicesServ.getServices().subscribe( res => {
            this.services = res.data;
     });
  }

  doPrompt(service) {
    if(service.con_acceso && service.sin_acceso){
          let prompt = this.alertCtrl.create({
        title: 'Accesos',
        message: "¿Ya tienes cuenta registrada en el portal de este servicio?",
        buttons: [
          {
            text: 'No',
            handler: data => {
              this.navCtrl.push(EditAccountPage,{endpoint: service.sin_acceso, action: "Agregar"});
            }
          },
          {
            text: 'Si',
            handler: data => {
              this.navCtrl.push(EditAccountPage,{endpoint: service.con_acceso, action: "Agregar"});
            }
          }
        ]
      });
      prompt.present();
    }else if(service.con_acceso){
      this.navCtrl.push(EditAccountPage,{endpoint: service.con_acceso, action: "Agregar"});
    }else{
      this.navCtrl.push(EditAccountPage,{endpoint: service.sin_acceso, action: "Agregar"});
    }
  }
}
