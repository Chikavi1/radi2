import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoginPage } from '../login/login.page';
import { ProfilePage } from '../profile/profile.page';
import { UbicacionModalPage } from '../ubicacion-modal/ubicacion-modal.page';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { ToastController } from '@ionic/angular';
import { ServiceModalPage } from '../service-modal/service-modal.page';
import { Network } from '@ionic-native/network/ngx';
import { LocalNotifications ,ELocalNotificationTriggerUnit} from '@ionic-native/local-notifications/ngx';

import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
 
const moment = extendMoment(Moment);

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {


  veterinarians: any;
  mostrar = false;

  slideOpts = {
    slidesPerView: 1.7,
    spaceBetween: 10
  }

  slideMini = {
    slidesPerView: 3.6
  }

  slide = {
    slidesPerView: 1.1,
    spaceBetween: 10,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }

  show = false;
  city;

  lottieConfig = {};
  constructor(
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private api: DataService,
    public alertController: AlertController,
    private modalController: ModalController,
    private nativeGeocoder: NativeGeocoder,
    public toastController: ToastController,
    private network: Network,
    private localNotifications: LocalNotifications

  ) {

    setTimeout(() => {
      this.mostrar = true;
    }, 1200);


    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.forwardGeocode('san mateo evangelista 4167-1,lomas de san miguel,tlaquepaque,jalisco.', options)
      .then((result: NativeGeocoderResult[]) => {
        this.presentToast(" " + result[0].latitude + ", " + result[0].longitude);
      })
      .catch((error: any) => console.log(error));

    this.city = (localStorage.getItem('city')) ? localStorage.getItem('city') : 'Selecciona ciudad';

    // this.lottieConfig = {
    //   path: 'https://assets7.lottiefiles.com/packages/lf20_ghDie2.json',
    //   renderer: 'canvas',
    //   autoplay: true,
    //   loop: true
    // };

    setTimeout(() => {
      this.show = true;
    }, 2500);


    this.consultarApi();


  }



  goToPage(pagina) {
    this.navCtrl.navigateForward(pagina);
  }

  consultarApi() {

    this.api.getVeterinans().subscribe((data) => {
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

  }



  async presentAlert(data, status) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: status,
      message: JSON.stringify(data),
      buttons: ['OK']
    });

    await alert.present();
  }



  openModal() {
    if (localStorage.getItem('token')) {
      this.presentModal(ProfilePage);
    } else {
      this.presentModal(LoginPage);
    }
  }

  async presentModal(component) {
    const modal = await this.modalController.create({
      component: component,
      cssClass: 'my-custom-class',

    });

    modal.onDidDismiss().then(() => {
      this.city = localStorage.getItem('city');

    });

    return await modal.present();
  }

  abrirUbicacion() {
    this.presentModal(UbicacionModalPage);
  }

  openServiceModal(service){
    this.presentModalService(ServiceModalPage,service);
  }


async presentModalService(component,service) {
  const modal = await this.modalController.create({
    component: component,
    cssClass: 'my-custom-class',
    componentProps: { value: service }

  });
  return await modal.present();
}

  addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

addHoursToDate(date: Date, hours: number): Date {
  return new Date(new Date(date).setHours(date.getHours() + hours));
}

cancelNotifications(){
  this.localNotifications.clearAll();
}

notifications(){
  

  // 3
      let configuracion = '{ "unit":1,"duration"   : 1, "frecuency" : 12, "start_time" : "7:00 am", "end_time"  : "11:00 pm" }';




  let desde = new Date();
  let hasta = this.addDays(desde,1)
  let range = moment.range(desde,hasta);
  let time_slots = Array.from(range.by('hours', {step: 3}));

  let format_date = time_slots.map(m => moment(m).format('YYYY-MM-DD HH:mm:ss'));
  format_date.forEach(( result ) => {
    this.localNotifications.schedule([
      {
        id: 125,
        smallIcon: 'res://calendar',
        sound: 'file://sound.mp3',
        title: 'Recordatorio de medicamento ',
        text: 'Recuerda darle una pastilla de paracetamol a radi a las '+result+'.',
        foreground: true,
        led: { color: '#FF00FF', on: 500, off: 500 },
        vibrate: true,
        data: { secret:'1' },
        icon: 'https://previews.123rf.com/images/shawnhempel/shawnhempel1405/shawnhempel140500164/28425182-blue-pills-in-transparent-pill-bottle-on-white.jpg',
        trigger: { at: new Date(result) },
        attachments: ['https://s26162.pcdn.co/wp-content/uploads/2019/03/pills.jpg'],
        priority: 1,
        actions: [
          { id: 'yes', title: 'Entendido' },
      ]
      }
    ]);
  });


  //  let  dayStart = moment.utc();
  // console.log("---");

  // console.log(format_date[0]);
  // let duration = 4; // se va a cambiar a la duracion de la configuración
  
  
  // let resultado = [];
  // let last_date = desde;
  // while(last_date < hasta){
  //   last_date = this.addHoursToDate(desde,8); 
  //   resultado.push( this.addHoursToDate(desde,8) );
  // }

  // console.log(desde,resultado);


  // let year = new Date().getFullYear();
  // let month = new Date().getMonth();
  // let day = new Date().getDate();
  
  // let time1 = new Date(year, month, day, 11, 13,0, 0);
  // let time2 = new Date(year, month, day, 11, 15, 0, 0);
  // let time3 = new Date(year, month, day, 11, 27, 0, 0);

  // console.log(time1);
  

  // this.localNotifications.schedule([
  //   {
  //     id: 125,
  //     smallIcon: 'res://calendar',
  //     sound: 'file://sound.mp3',
  //     title: 'Recordatorio de medicamento ',
  //     text: 'Recuerda darle una pastilla de paracetamol a radi a las '+format_date[0]+'.',
  //     foreground: true,
  //     led: { color: '#FF00FF', on: 500, off: 500 },
  //     vibrate: true,
  //     data: { secret:'1' },
  //     icon: 'https://previews.123rf.com/images/shawnhempel/shawnhempel1405/shawnhempel140500164/28425182-blue-pills-in-transparent-pill-bottle-on-white.jpg',
  //     trigger: { at: new Date(format_date[0]) },
  //     attachments: ['https://s26162.pcdn.co/wp-content/uploads/2019/03/pills.jpg'],
  //     priority: 1,
  //     actions: [
  //       { id: 'yes', title: 'Entendido' },
  //       // { id: 'no',  title: 'No' }
  //   ]
  //   }
  // ]);



  this.presentToast("se han configurado las alertas para los medicamentos."+format_date[0]);
 
}


}