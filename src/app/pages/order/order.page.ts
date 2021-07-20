import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { ModalComponent } from 'src/app/modal/modal.component';
import { DataService } from 'src/app/services/data.service';
import { PaymentsPage } from '../payments/payments.page';
import { SelectPetPage } from '../select-pet/select-pet.page';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})


export class OrderPage {
  extras;
  user_id  = localStorage.getItem('user_id');
  pet_id   = localStorage.getItem('pet_id');
  note     = 'ninguna nota por el momento.'
  price;
   constructor( 
    public modalController: ModalController,
    private navCtrl: NavController,
    public toastController: ToastController,
    public router: Router,
    public api: DataService) {
      
      this.extras = this.router.getCurrentNavigation().extras.state;
      console.log(this.extras);
      this.price = this.extras.price;
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
      // cssClass: 'small-modal',
      component: component,
    });

    modal.onDidDismiss().then( () => {

    });

    return await modal.present();
  }


  async presentModalSmall(component) {
    const modal = await this.modalController.create({
      cssClass: 'small-modal',
      component: component,
    });

    modal.onDidDismiss().then( () => {

    });

    return await modal.present();
  }



  createCharge(){
    if( parseInt(localStorage.getItem('pet_count')) > 1){
      this.presentModalSmall(SelectPetPage);
    }


    let reservation_data = {
      customer    : localStorage.getItem('customer_id'),
      account     : this.extras.veterinarian_account,
      price       : this.extras.price,
      id_vet      : this.extras.veterinarian_id,
      time        : this.extras.hour,
      id_user     : 1,
      name        : 'Luis Rojas',
      id_pet      : 1,
      note        : this.note,
      payment     : "ijnasda",
      duration    : 60,
      id_service  : this.extras.service_id,
      code        : '1',
    }


    // let data = {
    //   amount: 1000,
    //   customer: localStorage.getItem('customer_id'),
    //   account_id: this.extras.veterinarian_account
    // }

        this.api.createReservation(reservation_data).subscribe( datares => { 
          console.log(datares);
        });
      
     
      
    // });
  }

  goSuccess(){
    const extras: NavigationExtras = {
      queryParams:{
        invoice: 'simon'
      }
    }
    this.navCtrl.navigateForward('/success',extras);
  }


  beforePage(){
    this.navCtrl.back();
  }


}
