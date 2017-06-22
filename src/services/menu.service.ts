import {Injectable} from '@angular/core';
import {Restangular} from 'ng2-restangular';
import { ConfigService } from "../config/config.service";

@Injectable()
export class MenuService {
menu ;

   constructor(private restangular: Restangular, private configServ: ConfigService) {
     this.menu= this.restangular.one(configServ.getApiVersion()).one('menus.json');
   
   }
   getMenu(){
       return this.menu.get({api_key: this.configServ.getApiKey()});
   }

}