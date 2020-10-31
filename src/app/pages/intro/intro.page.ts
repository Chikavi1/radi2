import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  slide = {
    slidesPerView: 1,
    spaceBetween:10,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }

  lottieConfig;
  slide2animation;
  slide3animation;
  
  select;

  constructor(private navCtrl: NavController) { 
    this.lottieConfig = {
      path: 'https://assets7.lottiefiles.com/packages/lf20_ghDie2.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
  };

  this.slide2animation = {
    path: 'https://assets10.lottiefiles.com/packages/lf20_T7TNvI.json',
    renderer: 'canvas',
    autoplay: true,
    loop: true
};



  }

  ngOnInit() {
  }

  selecciona(name){
    this.select = name;
  }

  siguiente(){
    console.log("siguiente");
    localStorage.setItem('intro','true');
    localStorage.setItem('opcion',this.select);
    this.navCtrl.navigateForward(`index`);
  }
}
