import {Injectable} from '@angular/core';
import {Restangular} from 'ng2-restangular';
import { ConfigService } from "../../config/config.service";

@Injectable()
export class LegalService {
terms ;
privacy ;

   constructor(private restangular: Restangular, private configServ: ConfigService) {
     this.terms= this.restangular.one(configServ.getApiVersion()).one('terminos.json');
     this.privacy= this.restangular.one(configServ.getApiVersion()).one('avisos').one('privacidad.json');
   }
   getTerms(){
       return this.terms.get({api_key: this.configServ.getApiKey()});
   }
   getPrivacy(){
      return this.privacy.get({api_key: this.configServ.getApiKey()});
   }
}