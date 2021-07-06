import { Component,OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController, ToastController, ModalController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import jwt_decode from "jwt-decode";
import { ForgotPassPage } from '../forgot-pass/forgot-pass.page';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';


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
              private googlePlus: GooglePlus,
              public auth: AngularFireAuth
              ) {

    this.lottieConfig = {
      path: 'https://assets5.lottiefiles.com/packages/lf20_T7TNvI.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
  };
   
  this.auth.authState.subscribe( user => {

    if(!user){
      return;
    }


    console.log('estado',user);
    let uuid:any = user;
    localStorage.setItem('user_id',uuid.uid);
    if(uuid){
      this.goToPage('/');

    }


  })

}
              


  loginProvider(provider) {
    if(provider === 'google'){
      this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }else{
      this.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());

    }
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
        console.log(decoded);
          localStorage.setItem('user_id',decoded.id);
          localStorage.setItem('customer_id',decoded.customer)
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

