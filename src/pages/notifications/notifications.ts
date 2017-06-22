import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { NotificationsService } from "./notification.service";
import { NotificationDetailPage } from "./notification-detail/notification-detail";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {
    notifications;
    check;
    activate;

constructor(public navCtrl: NavController, public navParams: NavParams, public notificationServ: NotificationsService, private alertCtrl: AlertController) {
  }

  ionViewWillEnter(){
    this.notificationServ.getNotifications().subscribe( res => {
            this.notifications = res.data;
            this.check =false;
            this.activate = false;
            if(this.notifications){
              for(let notif of this.notifications){
                notif.Notificacion.selected = false;
              }
            }
     });
  }

  notificationSelected(detailsID){
    this.navCtrl.push(NotificationDetailPage,{detailsID});
  }

  typeCheck(){
       if(this.check==false){
         this.check=true;
       }else{
         this.check=false;
       }
  }

  allCheck(){
    this.check=true;
  }
  onDeleteNotification(){  
    let notifIds="";
                    if(this.notifications){
                      for(let notif of this.notifications){
                          if(notif.Notificacion.selected){
                            notifIds+=notif.Notificacion.id+",";
                            }
                          }
                        }
    let prompt = this.alertCtrl.create({
      title: 'Eliminar',
      message: "¿Desea elimanar esta notificación?",
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
            this.notificationServ.deleteNotification(notifIds.substring(0, notifIds.length - 1)).subscribe(res => {
              if (res.message.code == "success") {
                this.ionViewWillEnter();
              }
            });
          }
        }
      ]
    });
    if(notifIds != ""){
      prompt.present();
    }
  }
}

