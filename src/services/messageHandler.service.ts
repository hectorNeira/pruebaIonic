
import { AlertController } from "ionic-angular";
import { Injectable } from "@angular/core";

@Injectable()
export class MessageHandlerService {

    constructor(
    private alertCtrl: AlertController) {}

    handleError(error){
        if(error.status == 500){

        }else if(error.status == 500){

        }else if(error.status == 0 && error.statusText == ""){
            this.showErrorAlert("Verifica tu conexión a internet e intenta de nuevo");
        }else if(error.message){
            this.showErrorAlert(error.message.title);
        }else if(error.data.error_description){
            this.showErrorAlert(error.data.error_description);
        }else{
            this.showErrorAlert(error.data.message);
        }
    }

    handleSucces(succes){
        if(succes.message.title != 'ok'){
            this.showSuccessAlert(succes.message.title);
        }
    }
    
    private showErrorAlert(message: string) {
        const alert = this.alertCtrl.create({
          title: 'Ups!',
          message: message,
          buttons: ['Ok']
        });
        alert.present();
    }

    private showSuccessAlert(message: string) {
        const alert = this.alertCtrl.create({
          title: 'Yeii',
          message: message,
          buttons: ['Ok']
        });
        alert.present();
    }

}