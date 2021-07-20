import { Component} from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-service-modal',
  templateUrl: './service-modal.page.html',
  styleUrls: ['./service-modal.page.scss'],
})
export class ServiceModalPage {
  
  vets:any = [];
  service;
  constructor(
    public modalCtrl:ModalController,
    private navParams: NavParams,
    private api: DataService) { 
    this.service = this.navParams.get('value')
    this.api.search_service(this.service).subscribe(
      data => {
        this.vets = data;
        console.log(data);
      }
    )
  }



  exit(){
    this.modalCtrl.dismiss();
  }

}
