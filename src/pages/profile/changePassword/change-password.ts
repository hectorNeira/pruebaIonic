import { Component, ElementRef } from '@angular/core';
import { ViewController } from "ionic-angular";
import { NgForm } from "@angular/forms";
import { ProfileService } from "../profile.service";

@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html' 
})
export class ChangePasswordPage {

  constructor(public viewCtrl: ViewController, private profileServ: ProfileService, private elementRef: ElementRef) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onPasswordChange(form: NgForm){
      let formData = { "Usuario": form.value };
      this.profileServ.changePassword(formData).subscribe(res => {
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
        }
      });
  }

}
