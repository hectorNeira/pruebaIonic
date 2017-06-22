import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import  { LegalService } from '../legal.service';


@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html'
})
export class TermsPage {
	termsHtml: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public legalServ: LegalService) {
  	legalServ.getTerms().subscribe( res => {
            this.termsHtml = res.data.Termino.descripcion;
        })
  }
}
