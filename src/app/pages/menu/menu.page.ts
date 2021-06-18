import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {

  mascotas = [];
  mostrar = false;
  constructor(
    public navCtrl:NavController,
    private api: DataService,
    private modalController: ModalController
    ){


    setTimeout(() => {
      this.mostrar = true;
     }, 4200);

    this.api.getPets(1).subscribe( datos => {
      console.log(datos);
      this.mascotas = datos;
    });

   }

  slide = {
    slidesPerView:  1.13,
    spaceBetween:5,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }



  goToPage(pagina){
    this.navCtrl.navigateForward(pagina);
  }

  logout(){
    localStorage.removeItem('user_id');
    this.goToPage('/login');
  }


  async presentModal(component) {
    const modal = await this.modalController.create({
      component: component,
      cssClass: 'my-custom-class',
      
    });

    modal.onDidDismiss().then( () => {
      // this.city = localStorage.getItem('city');

    });

    return await modal.present();
  }
}
