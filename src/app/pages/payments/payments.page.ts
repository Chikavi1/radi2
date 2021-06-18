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
    this.obtenerTarjetas();



   }



  agregarTarjeta(){
    this.presentModal(CardPage);
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



    // si tengo costumer haz esto
    let costumer_id = localStorage.getItem('costumer_id');
    let token = 'tok_1J2QwuJl56kWzuPasaOtFFlV';
    let email = 'chikavi@hotmail.com';
    let name  = 'francisco rojas';




    if(costumer_id){
      this.data.getCostumer(costumer_id).subscribe( data => {
          // to do
      });
    }else{



      //   this.stripe.createCardToken(this.cardDetails)
      //   .then(token => {


      //   this.data.createCostumer(token,email,name).subscribe( data => {
      //     console.log(data);
        
      //   });

      // })
      // .catch(error => console.error(error));


      this.data.createCostumer(token,email,name).subscribe( data => {
            console.log(data);
            localStorage.setItem('customer_id',data.id);
          });

     
    }
    


  }

addcard(){
  console.log('dio click');
  this.data.addcard(this.customer_id,'tok_1J2iSiJl56kWzuPav9EjFOu5').subscribe( data => {
    console.log(data);
  });
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
