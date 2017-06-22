import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QuestionsService } from "./questions.service";


@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html'
})
export class QuestionsPage {
sections;

  constructor(public navCtrl: NavController, public navParams: NavParams, public questionsServ: QuestionsService) {
  	questionsServ.getQuestions().subscribe( res => {
            this.sections = res.data;
     })
  }
}
