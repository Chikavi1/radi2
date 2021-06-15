import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { ModalComponent } from 'src/app/modal/modal.component';
import { Stripe } from '@ionic-native/stripe/ngx';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})


export class OrderPage {
  stripe_Key = 'pk_test_51IiBSHJl56kWzuPaD4tpE247FRDmoSxUS8qxsVYDC1L9EidPqCUJuZpmpFvtDm1vcqLITJBQQxud22JQKdalUUXQ001rm7byf7';
  cardDetails;
  extras;
  customer_id = '';
  number;

  cards:any;


  slide = {
    slidesPerView:  1.1,
    spaceBetween:10,
    
  }

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

      this.customer_id = localStorage.getItem('customer_id');

      this.obtenerTarjetas();
     }

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
      number: this.number,
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
