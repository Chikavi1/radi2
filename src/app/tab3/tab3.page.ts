import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProfilePage } from '../pages/profile/profile.page';
import { LoginPage } from '../pages/login/login.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
lottieConfig = {};

  constructor(private router: Router,private navCtrl: NavController,private modalController:ModalController,
    ) {
    this.lottieConfig = {
        path: 'https://assets6.lottiefiles.com/datafiles/XRVoUu3IX4sGWtiC3MPpFnJvZNq7lVWDCa8LSqgS/profile.json',
        renderer: 'canvas',
        autoplay: true,
        loop: true
    };
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
      
    });
    return await modal.present();
  }
}
