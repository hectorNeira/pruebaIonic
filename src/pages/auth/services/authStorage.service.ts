import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';
import { ConfigService } from "../../../config/config.service";

@Injectable()
export class AuthStorageService {

    token: String;
    refreshToken: String;
    refreshInterval;

   constructor(private storage: Storage, private http: Http, private configServ: ConfigService) {
       storage.ready().then(() => {
           this.storage.get('token').then((val) => {
              this.token = val;
           }); 
           this.storage.get('refreshToken').then((val) => {
              this.refreshToken = val;
           }); 
     });
       
   }

   saveToken(token, refreshToken, expiresIn){
       this.token = token;
       this.refreshToken = refreshToken;
       this.storage.set('token', token);
       this.storage.set('refreshToken', refreshToken);

       //this.refreshInterval = setInterval(() => { this.sendRefreshToken(); }, (expiresIn - 90) * 1000);
       this.refreshInterval = setTimeout(() => { this.sendRefreshToken(); }, (expiresIn - 120) * 1000);
   }

   getToken(){
       return this.token;
   }

   dropTokens(){
       this.token = null;
       this.refreshToken = null;
       this.storage.remove('token');
       this.storage.remove('refreshToken');
       this.refreshInterval = null;
   }

    sendRefreshToken(){
        let clientData = { 
            client_secret: this.configServ.getSecret(), 
            api_key: this.configServ.getApiKey()
        };
        this.http.post('http://api.simpplo.com/oauth2/token?grant_type=refresh_token&refresh_token=' + this.refreshToken, clientData).subscribe(res => {
            let tokens = JSON.parse(res["_body"]);
            this.saveToken(tokens.access_token, tokens.refresh_token, tokens.expires_in);
        }, err =>{
            let error = err;
        });
    }

    confirmRefreshToken(){
        let clientData = { 
            client_secret: this.configServ.getSecret(), 
            api_key: this.configServ.getApiKey()
        };
        return this.http.post('http://api.simpplo.com/oauth2/token?grant_type=refresh_token&refresh_token=' + this.refreshToken, clientData);
    }
}