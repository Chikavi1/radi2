import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ModalController } from '@ionic/angular';
import { ProfilePage } from '../profile/profile.page';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage{
  isAuth:boolean;
  reservations;
  name;

  constructor(private dataService:DataService,
              private modalController:ModalController) { 
   

  }

  ionViewWillEnter () {
    console.log("se ejecuta");
    if(localStorage.getItem("token")){
      this.isAuth = true;
      this.name = localStorage.getItem("name");
      this.dataService.getReserves(localStorage.getItem("user_id")).subscribe(data=>{
        this.reservations = data;
        console.log(this.reservations);
       });
    }else{
      this.isAuth = false;
    }
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
        this.isAuth = true;
        this.name = localStorage.getItem("name");
        this.dataService.getReserves(localStorage.getItem("user_id")).subscribe(data=>{
          this.reservations = data;
          console.log(this.reservations);
         });
      }else{
        this.isAuth = false;
      }
    });
    return await modal.present();
  }


}