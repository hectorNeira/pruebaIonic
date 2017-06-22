import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AccountsService } from "../../accounts.service";

declare var require: any;

@Component({
  selector: 'page-debts-pdf',
  templateUrl: 'debts-pdf.html'
})
export class DebtsPdfPage {

  url;

  constructor(public navParams: NavParams, public accountServ: AccountsService, public viewCtrl: ViewController ) {}

 ionViewWillEnter() {
    this.url = this.navParams.get('url');
    this.accountServ.getPdf(this.url).subscribe( res => {
      this.loadPDF(res.data);
    });
  }

  close() {
    this.viewCtrl.dismiss();
  }


  loadPDF(pdfData){
    pdfData = atob(pdfData);
    require('pdfjs-dist');
    var fs = require('fs');
    PDFJS.workerSrc = 'assets/js/pdf.worker.js'

    let loadingTask = PDFJS.getDocument({data: pdfData});
    
    loadingTask.then(function(pdf) {
    console.log('PDF loaded');
    
    // Fetch the first page
    var pageNumber = 1;
    pdf.getPage(pageNumber).then(function(page) {
      console.log('Page loaded');
      
      var scale = 1.5;
      var viewport = page.getViewport(scale);

      // Prepare canvas using PDF page dimensions
      var canvas = <HTMLCanvasElement>document.getElementById('the-canvas');
      var context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      var renderTask = page.render(renderContext);
      renderTask.then(function () {
        console.log('Page rendered');
      });
    });
  }, function (reason) {
    // PDF loading error
    console.error(reason);
  });
  }

}
