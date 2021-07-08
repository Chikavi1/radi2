import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ModalController, NavController } from '@ionic/angular';
import { ProfilePage } from '../profile/profile.page';
import { LoginPage } from '../login/login.page';
import * as moment from 'moment';
import { ReviewsPage } from '../reviews/reviews.page';

import * as Leaflet from 'leaflet';
import 'leaflet-routing-machine';

import { MapModalPage } from '../map-modal/map-modal.page';

declare var L: any;
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})



export class ReservationPage{

  @ViewChild('box',{static:false}) box: ElementRef;

  map: Leaflet.Map;

  reservations;
  paymentMethod:any;
  
  amount;
  currency;
  payment_description;
  card_brand;
  card_last4;
  card_exp_month;
  card_exp_year;

  mapa: any;


  createdCode = 'sadniasdnoasda';
  slideOpts = {
    slidesPerView: 1.15,
    spaceBetween:3,
    pager: true
  }



  constructor(private dataService:DataService,
              private modalController:ModalController,
              private navCtrl: NavController) { 

                setTimeout(() => {
                  this.animationIn();
                }, 300);
            
  }

  ionViewDidEnter() { this.leafletMap(); }

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

  // animations

  animationIn(){
    this.box.nativeElement.classList.add('magictime');
    this.box.nativeElement.classList.add('vanishIn');
  }


  animationOut() {
    this.box.nativeElement.classList.add('magictime');
    this.box.nativeElement.classList.add('vanishOut');
}


  leafletMap() {
  let lat = 20.620575;
  let lng =  -103.305554;

  let PointA_lat = 20.620575;
  let PointA_lng =  -103.305554;


  let PointB_lat = 20.651921;
  let PointB_lng =  -103.336855;



    this.mapa = Leaflet.map('mapId').setView([lat, lng], 11);
    var vetIcon = L.icon(
      {
        iconUrl: 'https://i.ibb.co/Q6SLBKF/veterinarian.png',
        shadowUrl: 'https://i.ibb.co/Q6SLBKF/veterinarian.png',
        iconSize:     [25, 41], // size of the icon
        shadowSize:   [41, 41] // size of the shadow
      });
      var homeICon = L.icon(
        {
          iconUrl: '        https://i.ibb.co/7JTcSnJ/pet-house.png',
          shadowUrl: '        https://i.ibb.co/7JTcSnJ/pet-house.png',
          iconSize:     [25, 41], // size of the icon
          shadowSize:   [41, 41] // size of the shadow
        });
    
    Leaflet.marker([20.620575,-103.305554],{icon: homeICon}).addTo(this.mapa).bindPopup('Ubicación');
    Leaflet.marker([20.651921,-103.336855],{icon: vetIcon}).addTo(this.mapa).bindPopup('Veterinaria');


    Leaflet.tileLayer('https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga', {
    zoom: 8,
    maxZoom: 18,
    minZoom: 4,
    minResolution: 4891.96981025128,
    maxResolution: 39135.75848201024,
    doubleClickZoom: true,
    center: [lat, lng]
    }).addTo(this.mapa);

    Leaflet.Routing.control({
      waypoints: [
        Leaflet.latLng(PointA_lat, PointA_lng),
        Leaflet.latLng(PointB_lat, PointB_lng)
      ],
      lineOptions: {
        styles: [{color: '#17202F', opacity: 1, weight: 5}]
     },
     createMarker: function(i, wp, nWps) {
      return null;
    }
        // color: '#17202F',
      //  routeWhileDragging: true
    }).addTo(this.mapa);



    // this.map = Leaflet.map('mapId').setView([20.620626, -103.305506], 17);
    // Leaflet.tileLayer('https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga', {
    // }).addTo(this.map);

    // // Leaflet.marker([28.6, 77]).addTo(this.map).bindPopup('Delhi').openPopup();
    // // Leaflet.marker([34, 77]).addTo(this.map).bindPopup('Leh').openPopup();

    // // antPath([[20.620626, -103.305506], [20.615457, -103.303546]],
    // //   { color: '#FF0000', weight: 5, opacity: 0.6 })
    // //   .addTo(this.map);

    // Leaflet.Routing.control({
    //     waypoints: [
    //       Leaflet.latLng(20.620626, -103.305506),
    //       Leaflet.latLng(20.615457,  -103.303546)
    //     ]
    //   }).addTo(this.map);
  }

  openMap(){
    this.animationOut();
    setTimeout(() => {
      this.presentModal(MapModalPage);
   }, 300);
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

  beforePage(){
    this.navCtrl.back();
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


  mandarMensaje(){
    this.navCtrl.navigateForward(`/chat`);

  }

}
