import {Injectable} from '@angular/core';
import {Restangular} from 'ng2-restangular';
import { Storage } from '@ionic/storage';
import { ConfigService } from "../../../config/config.service";

@Injectable()
export class AuthService {

    users;
    oauth;
    devices;
    version;

   constructor(private restangular: Restangular, private storage: Storage, private configServ: ConfigService) {
       this.users = this.restangular.one(configServ.getApiVersion()).one('usuarios');
       this.oauth  = this.restangular.all('oauth2');
       this.devices = this.restangular.one(configServ.getApiVersion()).one('dispositivos');
       this.version = this.restangular.one(configServ.getApiVersion());
   }

   getSignupFields(){
       return this.users.one('registro.json').get({api_key: this.configServ.getApiKey(), client_secret: this.configServ.getSecret()});
   }

   signup(data){
       let sendData = {
           Usuario: data
       };
       return this.users.one('registro.json?api_key=' + this.configServ.getApiKey() + '&client_secret=' + this.configServ.getSecret()).customPOST(sendData);
   }
   
   login(data){
       let clientData = { 
           client_secret: this.configServ.getSecret(), 
           api_key: this.configServ.getApiKey()
        };
       return this.oauth.one('token?grant_type=password&username=' + data.username + '&password=' + data.password).customPOST(clientData);
    }

    recoverPassword(data){
       return this.users.one('recuperar_contrasenia.json?api_key=' + this.configServ.getApiKey()).customPOST(data);
    }

    confirmPassword(data){
       return this.users.one('confirmar_contrasenia.json?api_key='+ this.configServ.getApiKey()).customPOST(data);
    }

    sendPlayerId(data){
        return this.devices.one(data+'.json').customPOST();
    }

    confirmCel(endpoint, data){
        return this.version.one(endpoint).customPOST(data);
    }
}