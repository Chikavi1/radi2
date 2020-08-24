import { Component, OnInit } from '@angular/core';

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
  yyy
  constructor() { 
    this.lottieConfig = {
      path: 'https://assets7.lottiefiles.com/packages/lf20_ghDie2.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
  };

  this.slide2animation = {
    path: 'https://assets3.lottiefiles.com/packages/lf20_XRLjtE.json',
    renderer: 'canvas',
    autoplay: true,
    loop: true
};

this.slide3animation = {
  path: 'https://assets10.lottiefiles.com/packages/lf20_T7TNvI.json',
  renderer: 'canvas',
  autoplay: true,
  loop: true
};

  }

  ngOnInit() {
  }

}
