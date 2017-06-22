import { Component, ViewChild, ElementRef } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
    selector: 'page-modal-hint',
  template: `
    <ion-content text-center padding class="hint-modal-content">
            <p padding *ngIf="text" class="hint-text">{{text}}</p>
            <ion-icon name="close-circle" class="hint-close-icon" (click)="close()"></ion-icon>
        <img class="hint-img" *ngIf="image" src="{{image}}">
    </ion-content>
  `
})

export class ModalHintPage {

  text;
  image;
  
  constructor(public viewCtrl: ViewController) {
      this.text= this.viewCtrl.data.text;
      this.image= this.viewCtrl.data.image;
    }
    
  close() {
    this.viewCtrl.dismiss();
  }

}