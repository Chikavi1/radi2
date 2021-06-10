import { Component } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { ModalComponent } from 'src/app/modal/modal.component';
import { Stripe } from '@ionic-native/stripe/ngx';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})


export class OrderPage {
  stripe_Key = 'pk_test_6Lh2y6pOLjooJHlRimCh1U7J00klDjsUau';
  cardDetails;

  constructor( 
    public modalController: ModalController,
    private navCtrl: NavController,
    private stripe:Stripe,
    public toastController: ToastController
    ) { }

  metodoPago(){
    this.presentModal(ModalComponent);
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
      number: 4242424242424242,
      expMonth: 4,
      expYear: 24,
      cvc: 424
    }

    console.log(this.cardDetails);

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
