import { Component, OnInit,Directive, HostListener, ElementRef } from '@angular/core';
import { Stripe } from '@ionic-native/stripe/ngx';
import * as moment from 'moment';
import { isValid } from 'cc-validate';
import { ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})

export class CardPage{
  
  
  stripe_Key = 'pk_test_6Lh2y6pOLjooJHlRimCh1U7J00klDjsUau';
  cardDetails:any = {};


  numero:string;
  titular:string;
  expiration:string;
  cvc:string;

  month:any;
  year:any;
  card_expiration:string;

  yearLimitIonDateTime;

  logoimg = null;
  mindate;

  constructor(
    private stripe:Stripe,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private api:DataService) {
    
    this.mindate = moment().format('YYYY-MM-DD');
    this.yearLimitIonDateTime = moment().year()+8;
    


  }




  exit(){
    this.modalCtrl.dismiss();
  }


  onEvent(event: KeyboardEvent,number) { 
    let result: any = isValid(number);
    if(result.isValid){
      this.logoimg = result.cardType;
      console.log(this.logoimg);
    }
    const input = event.target as HTMLInputElement;

    let trimmed = input.value.replace(/\s+/g, '');
    if (trimmed.length > 16) {
      trimmed = trimmed.substr(0, 16);
    }

    let numbers = [];
    for (let i = 0; i < trimmed.length; i += 4) {
      numbers.push(trimmed.substr(i, 4));
    }

    input.value = numbers.join(' ');

  }


   GetCardType(number){
    let result: any = isValid(number);
    if(result.isValid){
      this.logoimg = result.cardType;
      console.log(this.logoimg);
    }
  }

  ParseDataTimeToCardExpiration(date) {
    this.month =  moment(date).month()+1;
    this.year =  moment(date).year();
    this.card_expiration = this.month+'/'+this.year;
 }

 pagar(){
   const extras: NavigationExtras = {
          queryParams:{
            invoice: 'simon'
          }
        }
   this.navCtrl.navigateForward('/success',extras);
// se comento para hacer pruebas
  //  if(localStorage.getItem('user_id')){
  //   this.dataService.createReservation(
  //     this.data.id,localStorage.getItem('user_id'),this.data.price,this.data.day)
  //     .subscribe( resultado =>{
  //     const extras: NavigationExtras = {
  //       queryParams:{
  //         invoice: resultado.message
  //       }
  //     }
  //     if(resultado.message){
  //         this.navCtrl.navigateForward('/success',extras);
  //       }
  //   });
  //  }else{
  //    alert("necesitas estar logeado prro");
  //  }

  
 }


 agregarTarjeta(){
  //  creo token
  
    this.cardDetails = {
      number: this.numero,
      exp_month: this.month,
      exp_year: this.year,
      cvc: this.cvc
    }

  this.api.createToken(this.cardDetails).subscribe(
    (data:any) => {

        this.api.addcard(localStorage.getItem('customer_id'),data.id).subscribe( 
          data => {
            console.log(data);
            this.exit();
          },
          err => {
            console.log(err);
          }
        );

    },
    error => {
      if(error.error.code === "incorrect_number"){
        alert('Número incorrecto,verificalo.');
      }
      if(error.error.code === "card_declined"){
        alert('Tarjeta declinada, intenta con otra.');
      }
      console.log(error);
    }
  );

  
 }
 
 
  payWithStripe() {

  //   this.stripe.setPublishableKey(this.stripe_Key);

  //   this.cardDetails = {
  //     number: this.numero,
  //     expMonth: this.month,
  //     expYear: this.year,
  //     cvc: this.cvc
  //   }

  //   console.log(this.cardDetails);

  //   this.stripe.createCardToken(this.cardDetails)
  //     .then(token => {
  //       // Api con la cantidad 
  //       console.log(token);
  //     })
  //     .catch(error => console.error(error));
   }
   

}
