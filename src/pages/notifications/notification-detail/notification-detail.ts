import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { NotificationsService } from "../notification.service";
import { ValidateBankPage } from "../../banks/validate-bank/validate-bank";

@Component({
  selector: 'page-notification-detail',
  templateUrl: 'notification-detail.html'
})
export class NotificationDetailPage {
    details: any;
    notificationId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public notificationServ: NotificationsService, public alertCtrl: AlertController) {
    this.notificationId= this.navParams.get("detailsID");
  //se recibe el parametro de id
  	notificationServ.getDetailNotification(this.notificationId).subscribe( res => {
            this.details = res.data.Notificacion;
     });
     
  }

  marcarNotificacion(){
    this.notificationServ.unreadNotifiaction(this.details.id).subscribe( res => {
            if(res.message.code =="success"){
          this.navCtrl.pop();
        }
     });
  }
  goTo() {
        this.notificationServ.getDetailNotification(this.details.id).subscribe( res => {
        if(res.data.Notificacion.goto == "AccountsPage"){
            this.navCtrl.popToRoot();
        }
        if(res.data.Notificacion.goto == "ValidateBankPage"){
            this.navCtrl.push(ValidateBankPage, {endpoint: res.data.Notificacion.recurso_url});
        }
     });
  }
  eliminarNotificacion() {
    let prompt = this.alertCtrl.create({
      title: 'Eliminar',
      message: "¿Desea eliminar esta notificación?",
      buttons: [
        {
          text: 'No',
          handler: data => {
            console.log('Uff casi desaparesco');
          }
        },
        {
          text: 'Si',
          handler: data => {
                    this.notificationServ.deleteNotification(this.details.id).subscribe( res => {
                    if(res.message.code =="success"){
                  this.navCtrl.pop();
                }
            });
          }
        }
      ]
    });
    prompt.present();
  }
}   
