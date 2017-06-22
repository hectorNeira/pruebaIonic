import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'page-confirm-number',
  templateUrl: 'confirm-number.html'
})
export class ConfirmNumberPage {

  endpoint;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authServ: AuthService) {
    this.endpoint = navParams.get("endpoint");
  }

  onConfirm(form: NgForm){
    let user = { Usuario: form.value }
    this.authServ.confirmCel(this.endpoint, user).subscribe( res => {
      if(res.message.code == "success"){
        this.navCtrl.popToRoot();
      }
    });
  }
}
