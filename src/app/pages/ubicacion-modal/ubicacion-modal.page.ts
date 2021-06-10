import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController } from '@ionic/angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-ubicacion-modal',
  templateUrl: './ubicacion-modal.page.html',
  styleUrls: ['./ubicacion-modal.page.scss'],
})
export class UbicacionModalPage implements OnInit {

  constructor(private geolocation: Geolocation,    private modalCtrl: ModalController,private dataService:DataService) {

   
   }

  ngOnInit() {
  }

  exit(){
    this.modalCtrl.dismiss();
  }


  cargarUbicacion(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // https://api.opencagedata.com/geocode/v1/json?q=20.569378+-103.228566&key=29a47123819f46749a97b03576f4988f
      this.dataService.getCity(resp.coords.latitude,resp.coords.longitude).subscribe( data => {
       let ciudad = data.results[0].components.city;
       let estado;
       if( data.results[0].components.state_code){
         estado = ", "+data.results[0].components.state_code;
       }else{
        estado = '';
       }

       localStorage.setItem('city',ciudad+''+estado);

        console.log( ciudad+''+estado );
      });
      this.exit();
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp.coords);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}
