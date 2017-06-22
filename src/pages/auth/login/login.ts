import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { AuthService } from "../services/auth.service";
import { NgForm } from "@angular/forms";
import { ConfigService } from "../../../config/config.service";
import { SignupPage } from "../signup/signup";
import { AuthStorageService } from "../services/authStorage.service";
import { HomePage } from "../../home/home";
import { ForgotPasswordPage } from "./forgot-password/forgot-password";
import { AccountsPage } from "../../debts/accounts/accounts";
import { OneSignalService } from "../../../services/oneSignal.service";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {

  loginFields;
  signupPage = SignupPage;
  homePage = HomePage;
  accountsPage = AccountsPage;
  refreshInterval;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public authServ: AuthService, 
    public configServ: ConfigService,  
    public authStorageServ: AuthStorageService,
    public alerCtrl: AlertController,
    public modalCtrl: ModalController,
    private storage: Storage/*,
    public oneSignalServ: OneSignalService*/) {}

  ngOnInit() {
  } 

  onLogin(form: NgForm){
    let data = form.value;
    this.authServ.login(data).subscribe( res => {
            this.authStorageServ.saveToken(res.access_token, res.refresh_token, res.expires_in);
            /*
            let playerId = this.oneSignalServ.getPlayerId();
            this.authServ.sendPlayerId(playerId).subscribe( res => {
                console.log("playerId sended");
            });
            */
            this.navCtrl.setRoot(this.accountsPage);
        });
  }
  doConfirm() {
    let confirm = this.alerCtrl.create({
      title: 'Ingresa tu correo electrónico',
      message: 'En breve te llegara el correo con tu codigo para cambiar de contraseña',
      inputs: [
        {
          name: 'correo',
          placeholder: 'Correo electrónico'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Enviar',
          handler: (inputs) => {
            let data = { "Usuario": inputs };
            this.authServ.recoverPassword(data).subscribe( res => {
              if(res.message.code=='success'){
                this.navCtrl.push(ForgotPasswordPage);
              }
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
