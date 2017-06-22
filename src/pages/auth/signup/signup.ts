import { Component, OnInit, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../services/auth.service";
import { NgForm } from "@angular/forms";
import { PrivacyPage } from "../../legal/privacy/privacy";
import { LoginPage } from "../login/login";
import { MessageHandlerService } from "../../../services/messageHandler.service";
import { ConfirmNumberPage } from "./confirm-number/confirm-number";
import { AuthStorageService } from "../services/authStorage.service";
import { OneSignalService } from "../../../services/oneSignal.service";
import { AccountsPage } from "../../debts/accounts/accounts";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage implements OnInit {

  signupFields;
  privacyPage = PrivacyPage;
  loginPage = LoginPage;
  confirmNumberPage = ConfirmNumberPage;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private authServ: AuthService,
    private elementRef:ElementRef,
    private messajeServ: MessageHandlerService,
    private authStorageServ: AuthStorageService/*,
    private oneSignalServ: OneSignalService*/) {}

    ngOnInit() {
      this.authServ.getSignupFields().subscribe( res => {
        this.signupFields =  res.data.Usuario.slice();
      });    
    } 

    onSignup(form: NgForm){
      
      let postData = this.signupFields.slice();

      let formData = form.value;

      for(let i=0; i<postData.length; i++) {
        postData[i].valor = formData[postData[i].id];
      }
      

      this.authServ.signup(postData).subscribe( res => {

        var invalids = this.elementRef.nativeElement.querySelectorAll('.campo-invalido');
        for(let warning of invalids){
          warning.remove();
        }

        if(res.errors){
          for(var campo in res.errors){
            for(let msj of res.errors[campo]){
              var d1 = this.elementRef.nativeElement.querySelector('#'+campo);
              d1.insertAdjacentHTML('afterend', '<ion-item class="campo-invalido"><p>' + msj + '</p></ion-item>');
            }
          }
        }else{
          if(res.message.code == "success"){
            let signUpRes = res;
            let data = { username: form.value.correo, password: form.value.password };
            this.authServ.login(data).subscribe( res => {
              this.authStorageServ.saveToken(res.access_token, res.refresh_token, res.expires_in);
              /*
              let playerId = this.oneSignalServ.getPlayerId();
              this.authServ.sendPlayerId(playerId).subscribe( res => {
                console.log("playerId sended");
              });
              */
              if(signUpRes.redirect){
                this.navCtrl.push(this.confirmNumberPage, { endpoint: signUpRes.redirect.ConfirmarTelefono });
              }else{
                this.navCtrl.setRoot(AccountsPage);
              }
            });
          }
        }
      });
    }
}
