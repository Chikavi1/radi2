import { Component, ContentChild, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController, ToastController, ModalController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import jwt_decode from "jwt-decode";
import { ForgotPassPage } from '../forgot-pass/forgot-pass.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {
  
  email = '';
  password = '';
  validaciones = false;
  lottieConfig = {};
  showPassword = false;

  constructor(private toastController: ToastController,
              private navCtrl: NavController,
              private dataService: DataService,
              private modalCtrl: ModalController,
              private googlePlus: GooglePlus
              ) {

    this.lottieConfig = {
      path: 'https://assets5.lottiefiles.com/packages/lf20_T7TNvI.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
  };
   
  }
  login(){

    // this.googlePlus.login({})
    // .then(res => JSON.stringify(res))
    // .catch(err => console.error(err));

    // solo para pruebas
    // this.goToProfile();

    // solo para pruebas
    // console.log(this.email,this.password);
    this.dataService.login(this.email,this.password).subscribe(data=>{
      
      if(data.token){
        var decoded:any = jwt_decode(data.token);
          localStorage.setItem('user_id',decoded);
          this.goToPage('/');
        // this.goToProfile();

      }else{
        this.presentToast("Verifica si tu correo o contraseña son correctos.","danger");
      }
    }, error => {
      if(error.statusText === 'Unauthorized' ){
        this.presentToast('Email o contraseña incorrecta.',"danger");
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
  // goToProfile(){
  //   this.modalCtrl.dismiss().then( () => {
  //     this.presentModal(ProfilePage);
  //   });
  // }

  async presentModal(component) {
    const modal = await this.modalCtrl.create({
      component: component,
      cssClass: 'my-custom-class',
      showBackdrop: false,
      presentingElement: await this.modalCtrl.getTop()
    });
    return await modal.present();
  }

  goToPage(pagina){
    this.navCtrl.navigateForward(pagina);
  }



  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  forgotPass(){
   
      this.presentModal(ForgotPassPage);
  }
  registrate(){
   
    this.presentModal(RegisterPage);
}

}

