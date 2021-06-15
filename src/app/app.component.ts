import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private network: Network
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();
      if(localStorage.getItem('intro')){
        this.router.navigateByUrl('/order');
      }else{
        this.router.navigateByUrl('/intro');
      }
      this.checkDarkTime();
    });

    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('Se ha desconectado :-(');
    });

    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('Se ha conectado!');
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('Tenemos conexión a internet, woohoo!');
        }
      }, 3000);
    });
    
  }

  

  checkDarkTime(){
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if(prefersDark.matches){
      document.body.classList.toggle('dark')
    }
  }
}
