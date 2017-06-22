import {Injectable} from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';
import { Storage } from '@ionic/storage';
import { App } from "ionic-angular";
import { ValidateBankPage } from "../pages/banks/validate-bank/validate-bank";

@Injectable()
export class OneSignalService {

    playerId;

   constructor(private oneSignal: OneSignal, private app: App, private storage: Storage) {

       //this.oneSignal.startInit('168e173b-18fd-4d6d-a6f5-82c35b661946', '15390301275');
       this.oneSignal.startInit('e3ddf31b-134d-4d2b-a5a1-3f5e061717f4', '567230711277');
       
       this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
        
        this.oneSignal.handleNotificationReceived().subscribe(res => {
         // do something when notification is received
        });
        
        this.oneSignal.handleNotificationOpened().subscribe(res => {
          // do something when a notification is opened
          var nav = this.app.getActiveNav();
          if(res.notification.payload.additionalData.goto == "AccountsPage"){
            if(nav.getActive() != nav.first()){ //si la ventana activa es diferente del root(first) haz el pop si no no
                nav.popToRoot();
            }
         }else{
             if(nav.getActive().name != "LoginPage" && nav.getActive().name != "SignupPage"){
                if(res.notification.payload.additionalData.goto == "ValidateBankPage"){
                    nav.push(ValidateBankPage, {endpoint: res.notification.payload.additionalData.recurso_url});
                  }
            }else{
                this.storage.ready().then(() => {
                    this.storage.set('pendingPage', {page: res.notification.payload.additionalData.goto, endpoint: res.notification.payload.additionalData.recurso_url});
              });
            }
         }
        });
        
        this.oneSignal.endInit();

        this.oneSignal.getIds().then(res =>{
            this.playerId = res.userId;
        });
   }

   getPlayerId(){
       return this.playerId;
   }

}