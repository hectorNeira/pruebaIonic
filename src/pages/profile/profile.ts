import { Component, OnInit, ElementRef } from '@angular/core';
import { ProfileService } from "./profile.service";
import { ModalController, NavController } from "ionic-angular";
import { ChangePasswordPage } from "./changePassword/change-password";
import { NgForm } from "@angular/forms";
import { ConfirmNumberPage } from "../auth/signup/confirm-number/confirm-number";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit {

  userData = {};
  confirmNumberPage = ConfirmNumberPage;

  constructor(public navCtrl: NavController, public profileServ: ProfileService, private elementRef:ElementRef, public modalCtrl: ModalController) {}

  ngOnInit() {
    this.profileServ.getUserData().subscribe( res => {
      this.userData =  res.data;
    });
  } 

  presentPasswordModal() {
    let modal = this.modalCtrl.create(ChangePasswordPage);
    modal.present();
  }

  onProfileChange(form: NgForm){
    this.profileServ.updateUser(this.userData).subscribe( res => {

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
            if(res.redirect){
              this.navCtrl.push(this.confirmNumberPage, { endpoint: res.redirect.ConfirmarTelefono });
            }
          }
        }
      },
        error => {
            let err = error;
        });
  }

}
