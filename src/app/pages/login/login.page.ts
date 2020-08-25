import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController, ToastController, ModalController } from '@ionic/angular';
import { ProfilePage } from '../profile/profile.page';
import { RegisterPage } from '../register/register.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email;
  password;
  lottieConfig = {};

  constructor(private toastController: ToastController,
              private navCtrl: NavController,
              private dataService: DataService,
              private modalCtrl: ModalController) {

    this.lottieConfig = {
      path: 'https://assets5.lottiefiles.com/packages/lf20_T7TNvI.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
  };
   
  }
  login(){
    this.dataService.login(this.email,this.password).subscribe(data=>{
      if(data.access_token){
        localStorage.setItem('token',data.access_token);
        localStorage.setItem('user_id',data.user_id);
        localStorage.setItem('name',data.user_name);
        this.goToProfile();

      }else{
        this.presentToast("Verifica si tu correo o contraseña son correctos.","danger");
      }
    });
  }
  ngOnInit() {
  }

  async presentToast(data,color) {
    const toast = await this.toastController.create({
      message: data,
      duration: 1500,
      color: color
    });
    toast.present();
  }

  

  exit(){
    this.modalCtrl.dismiss();
  }
  goToRegister(){
    this.modalCtrl.dismiss().then( () => {
      this.presentModal(RegisterPage);
    });
  }
  goToProfile(){
    this.modalCtrl.dismiss().then( () => {
      this.presentModal(ProfilePage);
    });
  }

  async presentModal(component) {
    const modal = await this.modalCtrl.create({
      component: component,
      cssClass: 'my-custom-class',
      showBackdrop: false,
      presentingElement: await this.modalCtrl.getTop()
    });
    return await modal.present();
  }

}
