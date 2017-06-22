import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AccountsService } from "../accounts.service";
import { FormBuilder, Validators, FormGroup, NgForm } from "@angular/forms";
import { ModalHintPage } from "./modal-hint/modal-hint";


@Component({
  selector: 'page-edit-account',
  templateUrl: 'edit-account.html'
})
export class EditAccountPage implements OnInit {
    accounts;   
    accountFormGroup: FormGroup; 
    action;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public accountServ: AccountsService, 
              public formBuilder: FormBuilder, 
              public modalCtrl: ModalController,
              public alertCtrl: AlertController) {
    this.accountFormGroup = formBuilder.group({});  
}
  ionViewWillLeave(){
    this.navCtrl.pop();
  }

  ngOnInit() {
    let url = this.navParams.get("endpoint");
    this.action = this.navParams.get("action");
    this.accountServ.getServiceFields(url).subscribe( res => {
            this.accounts = res.data;

            if(this.accounts.Cuenta.motivo_de_revision != null){
              this.showReason(this.accounts.Cuenta.motivo_de_revision);
            }

            let group = {};

            if(this.accounts.CampoCuenta){
              for(let campo of this.accounts.CampoCuenta){
                group[campo.id] = [campo.valor, Validators.compose([Validators.maxLength(campo.longitud_requerida), Validators.required, Validators.pattern(campo.expresion_regular)])];
              }
            }

            group['nombre'] = [this.accounts.Cuenta.nombre, Validators.required];

            this.accountFormGroup = this.formBuilder.group(group);
            
     })
    } 

    showReason(reason) {
      let alert = this.alertCtrl.create({
        title: 'Motivo de revisión',
        subTitle: reason,
        buttons: ['Aceptar']
      });
      alert.present();
    }

    presentHintModal(field) {
      let modal = this.modalCtrl.create(ModalHintPage, {text: field.ayuda, image: field.ayuda_imagen});
      modal.present();
    }

    isValid(controlId){
      return this.accountFormGroup.controls[controlId].valid;
    }

    onAddAccount(form: NgForm){
        let data = form.value;
        let url = this.navParams.get("endpoint");

        if(this.accounts.CampoCuenta){
          for(let field of this.accounts.CampoCuenta){
            field.valor = data[field.id];
          }
        }
        this.accounts.Cuenta.nombre = data.nombre;
        if(this.action == "Editar"){
          this.accountServ.editAccount(url, this.accounts).subscribe( res => {
            if(res.message.code == "success"){
              this.navCtrl.pop();
            }
          });
        }else{
          this.accountServ.addAccount(url, this.accounts).subscribe( res => {
            if(res.message.code == "success"){
              this.navCtrl.pop();
            }
          });
        }
    }

}
