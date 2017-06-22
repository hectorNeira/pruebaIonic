import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, LoadingController } from 'ionic-angular';
import { MyApp } from './app.component';
import { RestangularModule } from 'ng2-restangular';
import { IonicStorageModule } from '@ionic/storage';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SignupPage } from "../pages/auth/signup/signup";
import { AuthStorageService } from "../pages/auth/services/authStorage.service";
import { AuthService } from "../pages/auth/services/auth.service";
import { LoginPage } from "../pages/auth/login/login";
import { MessageHandlerService } from "../services/messageHandler.service";
import { ConfigService } from "../config/config.service";
import { LegalService } from "../pages/legal/legal.service";
import { TermsPage } from "../pages/legal/terms/terms";
import { PrivacyPage } from "../pages/legal/privacy/privacy";
import { HomePage } from "../pages/home/home";
import { MenuService } from "../services/menu.service";
import { ProfilePage } from "../pages/profile/profile";
import { ProfileService } from "../pages/profile/profile.service";
import { ChangePasswordPage } from "../pages/profile/changePassword/change-password";
import { QuestionsPage } from "../pages/questions/questions";
import { QuestionsService } from "../pages/questions/questions.service";
import { ForgotPasswordPage } from "../pages/auth/login/forgot-password/forgot-password";
import { AccountsPage } from "../pages/debts/accounts/accounts";
import { AccountsService } from "../pages/debts/accounts.service";
import { ServicesPage } from "../pages/debts/services/services";
import { ServicesService } from "../pages/debts/services/services.service";
import { DebtsHistoryPage } from "../pages/debts/debts-history/debts-history";
import { PopoverPage } from "../pages/debts/accounts/popoverPage";
import { EditAccountPage } from "../pages/debts/edit-account/edit-account";
import { ModalHintPage } from "../pages/debts/edit-account/modal-hint/modal-hint";
import { DebtsPdfPage } from "../pages/debts/debts-history/debts-pdf/debts-pdf";
import { NotificationsPage } from "../pages/notifications/notifications";
import { NotificationsService } from "../pages/notifications/notification.service";
import { NotificationDetailPage } from "../pages/notifications/notification-detail/notification-detail";
import { PressDirective } from "../components/directives/PressDirective";
import { PaymentHistoryPage } from "../pages/payment-history/payment-history";
import { PaymentHistoryService } from "../pages/payment-history/payment-history.service";
import { PaymentDetailPage } from "../pages/payment-history/payment-detail/payment-detail";
import { BankAccountsPage } from "../pages/bank-accounts/bank-accounts";
import { BankAccountsService } from "../pages/bank-accounts/bank-accounts.service";
import { OneSignalService } from "../services/oneSignal.service";
import { OneSignal } from "@ionic-native/onesignal";
import { ValidateBankPage } from "../pages/banks/validate-bank/validate-bank";
import { AddBankPage } from "../pages/add-bank/add-bank";
import { DebtsPaymentPage } from "../pages/payment/debts-payment/debts-payment";
import { DebtsPaymentService } from "../pages/payment/debts-payment/debts-payment.service";
import { PayableServicesPage } from "../pages/payable-services/payable-services";
import { PayableServicesService } from "../pages/payable-services/payable-services.service";
import { SpontaneousPaymentService } from "../pages/spontaneous-payment/spontaneous-payment.service";
import { SpontaneousPaymentPage } from "../pages/spontaneous-payment/spontaneous-payment";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { ConfirmNumberPage } from "../pages/auth/signup/confirm-number/confirm-number";
import { TransferListPage } from "../pages/transfer/transfer-list/transfer-list";
import { TransferDetailPage } from "../pages/transfer/transfer-detail/transfer-detail";
import { Contacts } from '@ionic-native/contacts';
import { AddBankDataPage } from "../pages/banks-datas/add-bank-data/add-bank-data";
import { BanksDataPage } from "../pages/banks-datas/banks-data/banks-data";
import { BanksDataService } from "../pages/banks-datas/banks-data.service";
import { TransferService } from "../pages/transfer/transfer.service";
import { NewTransferPage } from "../pages/transfer/new-transfer/new-transfer";
import { CreditService } from "../pages/credit/credit.service";
import { Step1BeginRequestPage } from "../pages/credit/step1-begin-request/step1-begin-request";

export function RestangularConfigFactory(RestangularProvider,
                                          authStorageServ: AuthStorageService, 
                                          loadingCtrl: LoadingController, 
                                          configServ: ConfigService, 
                                          msgHandlerServ: MessageHandlerService){
  RestangularProvider.setBaseUrl('https://api.simpplo.com');

  let timer;
  let loader = loadingCtrl.create({
      content: "Por favor espere..."
  });

  //se declara el interceptor de Request para que antes de hacer cualquier peticion le agregue el token en el header, si es que hay uno
  RestangularProvider.addFullRequestInterceptor((element, operation, path, url, headers, params) => {
    let token = authStorageServ.getToken();
    //se pone un timer, para que en cada peticion se muestre el loader solo si tarda mas de 1 segundo en responder el servidor, si tatrda menos no se muestra
    timer = setTimeout(function(){ 
      loader.present(); 
    }, 500);

    return {
      headers: Object.assign({}, headers, {Authorization: 'Bearer ' + token})
    };
  });

//Se agrega un Interceptor para el Response, cada vez que regrese una respuesta se quitará el loader y se resetara el timer para que deje de contar
  RestangularProvider.addResponseInterceptor((data, operation, what, url, response)=> {
    loader.dismiss().catch(() => {});
    clearTimeout(timer);
    let timerMsg = setTimeout(function(){ 
      if(data.message && data.message.code == "success"){
        msgHandlerServ.handleSucces(data);
      }
      if(data.message && data.message.code == "warning"){
        msgHandlerServ.handleError(data);
      }
    }, 200);
    return data;
 });

//Se agrega un Interceptor para Error, cada vez que devuelva un error se quitará el loader y se manejará el error con el service de error para mostrar alerta
 RestangularProvider.addErrorInterceptor((response, subject, responseHandler) => {
    loader.dismiss().catch(() => {});
    clearTimeout(timer);
    if(response.status == 401){ //si el token vencio, se debe generar uno nuevo
      // authStorageServ.sendRefreshToken().switchMap(res => {
      //   let tokens = JSON.parse(res["_body"]);
      //   authStorageServ.saveToken(tokens.access_token, tokens.refresh_token, tokens.expires_in);
      //   response.request.headers.set('Authorization', 'Bearer ' + tokens.access_token)
        
      //   return response.repeatRequest(response.request);
      // }).subscribe((res) => {
      //       let tokens = JSON.parse(res["_body"]);
      //   });
    }else{
      msgHandlerServ.handleError(response);
    }
  });
}

@NgModule({
  declarations: [
    MyApp,
    SignupPage,
    LoginPage,
    TermsPage,
    PrivacyPage,
    HomePage,
    ProfilePage,
    ChangePasswordPage,
    QuestionsPage,
    ForgotPasswordPage,
    ServicesPage,
    HomePage,
    AccountsPage,
    EditAccountPage,
    PopoverPage,
    DebtsHistoryPage,
    DebtsPdfPage,
    ModalHintPage,
    NotificationsPage,
    NotificationDetailPage,
    PopoverPage,
    PressDirective,
    BankAccountsPage,
    PaymentHistoryPage,
    PaymentDetailPage,
    ValidateBankPage,
    AddBankPage,
    DebtsPaymentPage,
    PayableServicesPage,
    SpontaneousPaymentPage,
    ConfirmNumberPage,
    TransferListPage,
    TransferDetailPage,
    NewTransferPage,
    AddBankDataPage,
    BanksDataPage,
    Step1BeginRequestPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    RestangularModule.forRoot([AuthStorageService, LoadingController, ConfigService, MessageHandlerService],RestangularConfigFactory),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignupPage,
    LoginPage,
    TermsPage,
    PrivacyPage,
    HomePage,
    ProfilePage,
    ChangePasswordPage,
    QuestionsPage,
    ForgotPasswordPage,
    ServicesPage,
    HomePage,
    AccountsPage,
    EditAccountPage,
    PopoverPage,
    DebtsHistoryPage,
    DebtsPdfPage,
    ModalHintPage,
    NotificationsPage,
    NotificationDetailPage,
    PopoverPage,
    BankAccountsPage,
    PaymentHistoryPage,
    PaymentDetailPage,
    ValidateBankPage,
    DebtsPaymentPage,
    AddBankPage,
    PayableServicesPage,
    SpontaneousPaymentPage,
    ConfirmNumberPage,
    TransferListPage,
    TransferDetailPage,
    NewTransferPage,
    AddBankDataPage,
    BanksDataPage,
    Step1BeginRequestPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    AuthStorageService,
    MessageHandlerService,
    ConfigService,
    LegalService,
    MenuService,
    ProfileService,
    QuestionsService,
    ServicesService,
    NotificationsService,
    AccountsService,
    BankAccountsService,
    PaymentHistoryService,
    OneSignal,
    OneSignalService,
    DebtsPaymentService,
    PayableServicesService,
    SpontaneousPaymentService,
    BarcodeScanner,
    TransferService,
    BanksDataService,
    Contacts,
    CreditService

  ]
})
export class AppModule {}
