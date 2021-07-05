import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { ModalComponent } from 'src/app/modal/modal.component';
import { Stripe } from '@ionic-native/stripe/ngx';
import { DataService } from 'src/app/services/data.service';
import { CardPage } from '../card/card.page';
import { PaymentsPage } from '../payments/payments.page';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})


export class OrderPage {
  stripe_Key = 'pk_test_51IiBSHJl56kWzuPaD4tpE247FRDmoSxUS8qxsVYDC1L9EidPqCUJuZpmpFvtDm1vcqLITJBQQxud22JQKdalUUXQ001rm7byf7';
  cardDetails;
 
  extras;
  

   constructor( 
    public modalController: ModalController,
    private navCtrl: NavController,
    private stripe:Stripe,
    public toastController: ToastController,
    public router: Router,
    public api: DataService


    ) {
      this.extras = this.router.getCurrentNavigation().extras.state;
      console.log(this.extras);
      
     }
  metodoPago(){
    this.presentModal(PaymentsPage);
  }
  metodoCupones(){
    this.presentModal(ModalComponent);
  }

  async presentToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  async presentModal(component) {
    const modal = await this.modalController.create({
      component: component,
    });

    modal.onDidDismiss().then( () => {

    });

    return await modal.present();
  }

  createCharge(){
    let data = {
      amount: 1000,
      customer: localStorage.getItem('customer_id'),
      account_id: this.extras.veterinarian_account
    }
    this.api.createCharge(data).subscribe(data =>  {
      console.log(data);
    });
  }

  goSuccess(){
    const extras: NavigationExtras = {
      queryParams:{
        invoice: 'simon'
      }
    }
    this.navCtrl.navigateForward('/success',extras);
  }
}
