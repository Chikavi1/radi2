import { Component } from '@angular/core';
import { Stripe } from '@ionic-native/stripe/ngx';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { CardPage } from '../card/card.page';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage {
  stripe_Key = 'pk_test_51IiBSHJl56kWzuPaD4tpE247FRDmoSxUS8qxsVYDC1L9EidPqCUJuZpmpFvtDm1vcqLITJBQQxud22JQKdalUUXQ001rm7byf7';
  cardDetails;
  extras;
  customer_id = '';
  number;
  cards:any;

  slide = {
    slidesPerView:  1.16,
    spaceBetween:10,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }

  constructor(
    public data:DataService,
    public modalController: ModalController,
    private stripe:Stripe
  ){

    this.customer_id = localStorage.getItem('customer_id');
   }

   ionViewWillEnter(){
    this.obtenerTarjetas();
   }

  agregarTarjeta(){
    this.presentModal(CardPage);
  }


  async presentModal(component) {
    const modal = await this.modalController.create({
      component: component      
    });
      modal.onDidDismiss().then( () => {
        this.obtenerTarjetas();
      });

    return await modal.present();
  }

  exit(){
    this.modalController.dismiss();
  }


// funcionalidad stripe
  verifica_costumer(){
    this.stripe.setPublishableKey(this.stripe_Key);

    this.cardDetails = {
      number: 5555555555554444,
      expMonth: 4,
      expYear: 24,
      cvc: 424
    }
    let costumer_id = localStorage.getItem('costumer_id');
  }


obtenerTarjetas(){
  this.data.getCards(this.customer_id).subscribe( cards => {
    this.cards = cards.data;
  });
}
  
deleteCard(customer_id,card_id){
  this.data.deleteCard(customer_id,card_id).subscribe( datos => {
    console.log(datos);
  });
}

updateDefaultCard(customer_id,card_id){
  this.data.updateDefaultCard(customer_id,card_id).subscribe( datos => {
    console.log(datos);
  });
  this.obtenerTarjetas();
}

}
