import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.page.html',
  styleUrls: ['./search-modal.page.scss'],
})
export class SearchModalPage {

  parametro = '';

  constructor(navParams: NavParams,public modalCtrl:ModalController) { 
    this.parametro = navParams.get('busqueda');
  }

exit(){
    this.modalCtrl.dismiss();
  }

}
