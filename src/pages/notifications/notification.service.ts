import {Injectable} from '@angular/core';
import { Restangular } from 'ng2-restangular';
import { ConfigService } from "../../config/config.service";


@Injectable()
export class NotificationsService {
notificationsList;
detailNotification;
 
   constructor(private restangular: Restangular, private configServ: ConfigService) {
     this.notificationsList= this.restangular.one(configServ.getApiVersion()).one('notificaciones.json');
     this.detailNotification= this.restangular.one(configServ.getApiVersion()).one('notificaciones');
  }
    getNotifications(){
      return this.notificationsList.get({api_key: this.configServ.getApiKey()});
    }

    getDetailNotification(detailsId){
     return this.detailNotification.one(detailsId+'.json').get();
    }

    deleteNotification(detailsId){
        return this.detailNotification.one('.json?ids='+ detailsId).customDELETE();
    }

    unreadNotifiaction(detailsId){
      return this.detailNotification.one(detailsId+'.json').customPUT();
    }

} 