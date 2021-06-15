import { Component, OnInit } from '@angular/core';
import { NavController,AlertController, ModalController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoginPage } from '../login/login.page';
import { ProfilePage } from '../profile/profile.page';
import { UbicacionModalPage } from '../ubicacion-modal/ubicacion-modal.page';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { ToastController } from '@ionic/angular';
import { ServiceModalPage } from '../service-modal/service-modal.page';
import { Network } from '@ionic-native/network/ngx';


@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {


veterinarians:any;
mostrar = false;

   slideOpts = {
    slidesPerView: 1.7,
    spaceBetween:10 
  }

slideMini = {
  slidesPerView: 3.6
}

  slide = {
    slidesPerView:  1.1,
    spaceBetween:10,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }




show = false;
city ;

lottieConfig = {};
  constructor(
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private api: DataService,
    public alertController: AlertController,
    private modalController: ModalController,
    private nativeGeocoder: NativeGeocoder,
    public toastController: ToastController,
    private network: Network

    ) {

      setTimeout(() => {
        this.mostrar = true;
       }, 1200);


      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
    };


    this.network.onDisconnect().subscribe(() => {
     this.presentToast('network was disconnected :-(');
    });



     this.network.onConnect().subscribe(() => {
     this.presentToast('network connected!');
      // We just got a connection but we need to wait briefly
       // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
         this.presentToast('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });



    this.nativeGeocoder.forwardGeocode('san mateo evangelista 4167-1,lomas de san miguel,tlaquepaque,jalisco.', options)
    .then((result: NativeGeocoderResult[]) => {
      this.presentToast(" "+result[0].latitude+", "+result[0].longitude);
      console.log('The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude)
    })
    .catch((error: any) => console.log(error));

      this.city = (localStorage.getItem('city'))?localStorage.getItem('city'):'Selecciona ciudad' ;

      // this.lottieConfig = {
      //   path: 'https://assets7.lottiefiles.com/packages/lf20_ghDie2.json',
      //   renderer: 'canvas',
      //   autoplay: true,
      //   loop: true
      // };

      setTimeout(()=>{
        this.show = true;
      },2500);


      this.consultarApi();


  }


 
  goToPage(pagina){
    this.navCtrl.navigateForward(pagina);
  }

  consultarApi(){
    
    this.api.getVeterinans().subscribe( (data) => {
      this.veterinarians = data;
    });

  }


  async presentToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  doRefresh(event) {

    this.consultarApi()


    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }


  ngOnInit() {

    // this.geolocation.getCurrentPosition().then((resp) => {
    //   this.dataService.getTerraces(resp.coords.latitude,resp.coords.longitude).subscribe(
    //     data  => {
    //       console.log(data);
    //       this.terraces = data.data;
    //     },
    //     error => {
    //     }
    //   );
    // }).catch((error) => {
    //    console.log('Error getting location', error);
    //    console.log('necesitas de internet para que te funcione')
    //  });
  }



  async presentAlert(data,status) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: status,
      message: JSON.stringify(data),
      buttons: ['OK']
    });

    await alert.present();
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
      cssClass: 'my-custom-class',
      
    });

    modal.onDidDismiss().then( () => {
      this.city = localStorage.getItem('city');

    });

    return await modal.present();
  }

  abrirUbicacion(){
     this.presentModal(UbicacionModalPage);
  }

  openServiceModal(){
    this.presentModal(ServiceModalPage);
  }
}
