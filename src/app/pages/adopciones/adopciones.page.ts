import { Component } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-adopciones',
  templateUrl: './adopciones.page.html',
  styleUrls: ['./adopciones.page.scss'],
})
export class AdopcionesPage   {
  requests:any = [];
  constructor(private api: DataService,private navCtrl: NavController) { 
    this.api.getRequestAdoptions(6).subscribe(
      data => {
        this.requests = data;
        console.log(data);
      }
    )
  }

  goToPage(pagina,status){
    
    let navigationExtras: NavigationExtras = {
      state: {
        status,
      } 
    };

    this.navCtrl.navigateForward(pagina,navigationExtras);
  }


  beforePage(){
    this.navCtrl.back();
  }

}
