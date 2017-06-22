import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import  { LegalService } from '../legal.service';


@Component({
  selector: 'page-privacy',
  templateUrl: 'privacy.html'
})
export class PrivacyPage {
  privacyHtml: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public legalServ: LegalService) {
  	legalServ.getPrivacy().subscribe( res => {
            this.privacyHtml = res.data.Aviso.descripcion;
        })
  }
}

