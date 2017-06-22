import { ModalController, NavController } from 'ionic-angular';
import { ModalPage } from './modal-page';
import { NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Component, OnInit, ElementRef } from "@angular/core";

@Component({
  templateUrl: 'forgot-password.html'
})

export class ForgotPasswordPage {
  confirmPassword: any;

  constructor(public authServ: AuthService, private elementRef:ElementRef, public modalCtrl: ModalController, public navCtrl: NavController) {}

    onForgot(form: NgForm){
      let formData = { "Usuario": form.value };
      this.authServ.confirmPassword(formData).subscribe(res => {
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
        }else if(res.message.code =="success"){
          this.navCtrl.pop();
        }
      });
  }

}