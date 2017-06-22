import { Component,ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavController} from "ionic-angular";
import { MenuController} from "ionic-angular";
import { Storage } from '@ionic/storage';

import { LoginPage } from "../pages/auth/login/login";
import { TermsPage } from "../pages/legal/terms/terms";
import { HomePage } from "../pages/home/home";
import { MenuService } from "../services/menu.service";
import { PrivacyPage } from "../pages/legal/privacy/privacy";
import { AuthStorageService } from "../pages/auth/services/authStorage.service";
import { QuestionsPage } from "../pages/questions/questions";
import { ServicesPage } from "../pages/debts/services/services";
import { ProfilePage } from "../pages/profile/profile";
import { DebtsHistoryPage } from "../pages/debts/debts-history/debts-history";
import { PaymentHistoryPage } from "../pages/payment-history/payment-history";
import { BankAccountsPage } from "../pages/bank-accounts/bank-accounts";
import { NotificationsPage } from "../pages/notifications/notifications";
import { AccountsPage } from "../pages/debts/accounts/accounts";
import { PayableServicesPage } from "../pages/payable-services/payable-services";
import { TransferListPage } from "../pages/transfer/transfer-list/transfer-list";
import { BanksDataPage } from "../pages/banks-datas/banks-data/banks-data";
import { NewTransferPage } from "../pages/transfer/new-transfer/new-transfer";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;
  termsPage = TermsPage;
  homePage = HomePage;
  questionsPage = QuestionsPage;
  servicesPage = ServicesPage;
  accountsPage = AccountsPage;
  menuList;


  @ViewChild('nav') nav:NavController;
  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    private menuCtrl: MenuController, 
    public menuServ: MenuService,
    private authStorageServ: AuthStorageService,
    private storage: Storage) 
    {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      menuServ.getMenu().subscribe( res => {
            this.menuList=res.data.Menu;
        });
      
      //se verifica si tiene sesion iniciada y de ser asi te redirecciona a home
      this.storage.ready().then(() => {
             this.storage.get('token').then((val) => {
                let token = val;
                if(token != null){
                  let succes = this.authStorageServ.confirmRefreshToken().subscribe(res => {
                      let tokens = JSON.parse(res["_body"]);
                      this.authStorageServ.saveToken(tokens.access_token, tokens.refresh_token, tokens.expires_in);
                      this.nav.setRoot(this.accountsPage);
                  }, err =>{
                      console.log("Error");
                  });
                }
             }); 
      });
    });
  }

  onLoad(page: any){
    switch(page){
      case "termsPage" :
        this.nav.push(TermsPage);
        break;
      case"privacyPage":
        this.nav.push(PrivacyPage);        
        break;
      case"questionsPage":
        this.nav.push(QuestionsPage);
        break;        
      case"servicesPage":
        this.nav.push(ServicesPage);        
        break;     
      case"profilePage":
        this.nav.push(ProfilePage);        
        break;
      case"debtsHistoryPage":
        this.nav.push(DebtsHistoryPage);        
        break;
      case"bankAccountsPage":
        this.nav.push(BankAccountsPage);        
        break;
      case"paymentHistoryPage":
        this.nav.push(PaymentHistoryPage);        
        break;
      case"notificationsPage":
        this.nav.push(NotificationsPage);        
        break;     
      case"payableServicesPage":
        this.nav.push(PayableServicesPage);        
        break;    
      case"transferListPage":
        this.nav.push(TransferListPage);        
        break;  
      case"newTransferPage":
        this.nav.push(NewTransferPage);        
        break;  
      case"banksDataPage":
        this.nav.push(BanksDataPage);        
        break;  
        
    }
    this.menuCtrl.close();
  }

  signout(){
    this.authStorageServ.dropTokens();
    this.nav.setRoot(this.rootPage);
    this.menuCtrl.close();
  }
}
