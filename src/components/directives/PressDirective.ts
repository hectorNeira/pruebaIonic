import {  Directive, ElementRef, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Gesture } from 'ionic-angular';
import { NotificationsPage } from "../../pages/notifications/notifications";


@Directive({
  selector: '[longPress]'

})
export class PressDirective implements OnInit, OnDestroy {
  element: HTMLElement;
  pressGesture: Gesture;
  check:any;
  @Output('long-press') onPressRelease: EventEmitter<any> = new EventEmitter();

  constructor(elementRef: ElementRef, public noti: NotificationsPage) {
    this.element = elementRef.nativeElement;
  }

  public theCallback() {

  }

  ngOnInit() {
    this.pressGesture = new Gesture(this.element);
    this.pressGesture.listen();
    this.check=false;
    this.pressGesture.on('press', (event) => {
          this.onPressRelease.emit('released');
          this.noti.typeCheck();
          console.log("clcik");
      });
    }
  ngOnDestroy() {
    this.pressGesture.destroy();
      }
    
  }

