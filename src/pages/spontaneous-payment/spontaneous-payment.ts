import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { SpontaneousPaymentService } from "./spontaneous-payment.service";
import { FormBuilder, Validators, FormGroup, NgForm } from "@angular/forms";
import { ModalHintPage } from "../debts/edit-account/modal-hint/modal-hint";
import { BankAccountsService } from "../bank-accounts/bank-accounts.service";
import { PaymentDetailPage } from "../payment-history/payment-detail/payment-detail";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-spontaneous-payment',
  templateUrl: 'spontaneous-payment.html'
})
export class SpontaneousPaymentPage {
  commission: any;
  banks: any;
  paymentDate;
  spontaneous: any;
  action: any;
  spontaneousFormGroup: FormGroup;
  details: any;
  serviceId: any;
  fieldIndexBarcode;
  date = { 
    month: new Date().toISOString()
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public spontaneousPaymentServ: SpontaneousPaymentService, public formBuilder: FormBuilder, public modalCtrl: ModalController, public bankAccountsServ: BankAccountsService,private barcodeScanner: BarcodeScanner) {
    this.serviceId= this.navParams.get("Id");
    this.spontaneousFormGroup = formBuilder.group({});  
  }
    ngOnInit() {
    this.action = this.navParams.get("action");
    this.spontaneousPaymentServ.getPayableServices(this.serviceId).subscribe( res => {
            this.spontaneous = res.data;

            let group = {};
              if(this.spontaneous.DetalleDeReferencia){
                          for(let detalleRef of this.spontaneous.DetalleDeReferencia){
                            if(detalleRef.verificar_longitud == true){
                              group[detalleRef.id] = [detalleRef.valor, Validators.compose([Validators.maxLength(detalleRef.longitud_requerida), Validators.required])];
                            }else{
                              group[detalleRef.id] = [detalleRef.valor, Validators.compose([Validators.minLength(detalleRef.longitud_requerida),Validators.maxLength(detalleRef.longitud_requerida), Validators.required])];
                            }
                          }
                        }   
            group['amount'] = [this.spontaneous.DetalleDeReferencia.amount, Validators.required];
            group['dueDate'] = [this.spontaneous.DetalleDeReferencia.dueDate, Validators.required];
            group['paymentMethods'] = [this.spontaneous.DetalleDeReferencia.paymentMethods, Validators.required];
            group['bankAccount'] = [this.spontaneous.DetalleDeReferencia.bankAccount, Validators.required];

            this.spontaneousFormGroup = this.formBuilder.group(group);
            this.bankAccountsServ.getActiveBankAccounts().subscribe( res => {
              this.banks = res.data;
              let anio = this.date.month.substring(0,4);
              let month = this.date.month.substring(5,7);
              let day = this.date.month.substring(7,9);
          });
     });
    }

    scanBarcode(fieldIndex){
      this.fieldIndexBarcode = fieldIndex;
      this.barcodeScanner.scan({"preferFrontCamera" : false
      ,"showFlipCameraButton" : true
      ,"prompt" : "Coloque un código de barras dentro del área de escaneo"
      ,"formats" : "QR_CODE,PDF_417,DATA_MATRIX,UPC_E,UPC_A,EAN_8,EAN_13,CODE_128,CODE_39,CODE_93,CODABAR,ITF,RSS14,RSS_EXPANDED,AZTEC,MSI"
    }).then((barcodeData) => {
      debugger;
      let control = this.spontaneousFormGroup.controls[this.spontaneous.DetalleDeReferencia[this.fieldIndexBarcode].id];
      control.setValue(barcodeData.text);
      }, (err) => {
          // An error occurred
      });
    }

    commissionPayment(monto,metodo){
          this.spontaneousPaymentServ.getCommissionPay(monto,this.serviceId,metodo).subscribe( res => {
            this.commission = res.data;
          });
    }
    onPayService(form: NgForm){
        let data = form.value;
        let url = this.navParams.get("endpoint");

        if(this.spontaneous.DetalleDeReferencia){
          for(let field of this.spontaneous.DetalleDeReferencia){
            field.valor = data[field.id];
          }
        }
        this.spontaneous.Pago.monto= data.amount;
        this.spontaneous.Pago.fecha_vencimiento= data.dueDate;
        this.spontaneous.Pago.metodo_pago= data.paymentMethods;
        this.spontaneous.CuentaBancaria = { id: data.bankAccount };

        this.spontaneousPaymentServ.addSpontaneousPay(this.spontaneous).subscribe( res => {
            if(res.message.code == "success"){
              this.navCtrl.push(PaymentDetailPage,{id: res.data.Pago.id});
            }
          });
      } 
    presentHintModal(field) {
      let modal = this.modalCtrl.create(ModalHintPage, {text: field.ayuda, image: field.ayuda_imagen});
      modal.present();
    }

    isValid(controlId){
      return this.spontaneousFormGroup.controls[controlId].valid;
    }
    
}
