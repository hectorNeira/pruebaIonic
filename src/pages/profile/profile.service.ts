import {Injectable} from '@angular/core';
import { Restangular } from 'ng2-restangular';
import { ConfigService } from "../../config/config.service";

@Injectable()
export class ProfileService {

    users;

   constructor(private restangular: Restangular, private configServ: ConfigService) {
       this.users = this.restangular.one(configServ.getApiVersion()).one('usuarios');
   }

   getUserData(){
       return this.users.one('perfil.json').get();
   }

   updateUser(data){
       return this.users.one('perfil.json').customPOST(data);
   }

   changePassword(data){
       return this.users.one('cambiar_contrasenia.json').customPOST(data);
    }
}