import {Injectable} from '@angular/core';
import {Restangular} from 'ng2-restangular';
import { ConfigService } from "../../config/config.service";

@Injectable()
export class QuestionsService {
questions;

   constructor(private restangular: Restangular, private configServ: ConfigService) {
     this.questions= this.restangular.one(configServ.getApiVersion()).one('faqs.json');
   }
   getQuestions(){
       return this.questions.get({api_key: this.configServ.getApiKey()});
   }
}