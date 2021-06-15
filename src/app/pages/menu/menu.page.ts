import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {

  mascotas = [];
  mostrar = false;
  constructor(public navCtrl:NavController,private api: DataService){


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

}
