import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-service-modal',
  templateUrl: './service-modal.page.html',
  styleUrls: ['./service-modal.page.scss'],
})
export class ServiceModalPage implements OnInit {

  constructor(public modalCtrl:ModalController) { }

  ngOnInit() {
  }

  exit(){
    this.modalCtrl.dismiss();
  }

}
