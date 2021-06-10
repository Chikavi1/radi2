import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ModalController, NavController } from '@ionic/angular';
import { ProfilePage } from '../profile/profile.page';
import { LoginPage } from '../login/login.page';
import * as moment from 'moment';
import { ReviewsPage } from '../reviews/reviews.page';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage{



  reservations;
  paymentMethod:any;
  
  amount;
  currency;
  payment_description;
  card_brand;
  card_last4;
  card_exp_month;
  card_exp_year;



  createdCode = 'sadniasdnoasda';
  slideOpts = {
    slidesPerView: 1.15,
    spaceBetween:3,
    pager: true
  }

  constructor(private dataService:DataService,
              private modalController:ModalController,
              private navCtrl: NavController) { 
  }

  ionViewWillEnter () {

    this.dataService.getPaymentMethod().subscribe( data => {
      let card = data.charges.data[0].payment_method_details.card;
      this.amount              = data.amount;
      this.currency            = data.currency;
      this.payment_description = data.description;
      this.card_brand          = card.brand;
      this.card_last4          = card.last4;
      this.card_exp_month      = card.exp_month;
      this.card_exp_year       = card.exp_year;
    
    
    });



  }




  openReview(){
    this.presentModal(ReviewsPage);
  }
  openModal(){
    if(localStorage.getItem('token')){
      this.presentModal(ProfilePage);
    }else{
      this.presentModal(LoginPage);
    }
  }



  async presentModal(component) {
    const modal = await this.modalController.create({
      component: component,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss().then(()=>{
      if(localStorage.getItem("token")){
        this.dataService.getReserves(localStorage.getItem("user_id")).subscribe(data=>{
          this.reservations = data;
          this.reservations.map(function(reservation){
            moment.locale('es');
            var dateTime = moment(reservation.day);
            reservation.day = dateTime.format('dddd, D MMMM YYYY');
            return reservation;
          });
         });
      }else{
      }
    });
    return await modal.present();
  }


}
