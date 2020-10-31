import { Component, OnInit } from '@angular/core';
import { NavController,AlertController, ModalController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoginPage } from '../login/login.page';
import { ProfilePage } from '../profile/profile.page';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

   slideOpts = {
    slidesPerView: 1.7,
    spaceBetween:10 
  }



  slide = {
    slidesPerView:  1.3,
    spaceBetween:10,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }
  terraces:any;
  terracesthumbnail:any;

show = false;
ciudad;

lottieConfig = {};
  constructor(
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private dataService:DataService,
    public alertController: AlertController,
    private modalController: ModalController) {
      this.lottieConfig = {
        path: 'https://assets7.lottiefiles.com/packages/lf20_ghDie2.json',
        renderer: 'canvas',
        autoplay: true,
        loop: true
    };
    this.ciudad = localStorage.getItem('ciudad');
    setTimeout(()=>{
      this.show = true;
    },2500);

  }

  ngOnInit() {
    this.dataService.getTerracesNormal().subscribe(
      data => {
        this.terracesthumbnail = data.data;
      }
    )



    this.geolocation.getCurrentPosition().then((resp) => {
      this.dataService.getTerraces(resp.coords.latitude,resp.coords.longitude).subscribe(
        data  => {
          console.log(data);
          this.terraces = data.data;
        },
        error => {
        }
      );
    }).catch((error) => {
       console.log('Error getting location', error);
       console.log('necesitas de internet para que te funcione')
     });
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


  showDog(id){
    console.log(id);
    this.navCtrl.navigateForward(`/show/${id}`);
  }

  buscarCiudad(event){
    console.log(event.target.value);
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
    return await modal.present();
  }
}
