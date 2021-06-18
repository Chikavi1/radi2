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
    // borrar despues
    public data: DataService


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
      cssClass: 'my-custom-class',
      
    });

    modal.onDidDismiss().then( () => {

    });

    return await modal.present();
  }

  goSuccess(){



    this.stripe.setPublishableKey(this.stripe_Key);

    this.cardDetails = {
      number: '4242424242424242',
      expMonth: 4,
      expYear: 24,
      cvc: 424
    }


    this.stripe.createCardToken(this.cardDetails)
      .then(token => {
        // Api con la cantidad 
        this.presentToast(token.id);
        console.log(token.id);
      })
      .catch(error => console.error(error));







    // const extras: NavigationExtras = {
    //   queryParams:{
    //     invoice: 'simon'
    //   }
    // }
    // this.navCtrl.navigateForward('/success',extras);

  }


}
