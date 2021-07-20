import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-select-pet',
  templateUrl: './select-pet.page.html',
  styleUrls: ['./select-pet.page.scss'],
})
export class SelectPetPage implements OnInit {

  constructor(
    public modalController: ModalController,
    ) { }

    slide = {
      slidesPerView: 1.2,
      spaceBetween: 10,
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }
    }
  

  ngOnInit() {
  }

  exit(){
    this.modalController.dismiss();
  }

}
