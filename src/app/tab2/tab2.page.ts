import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { SearchModalPage } from '../pages/search-modal/search-modal.page';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  isEmpty = false;
  buscando = false;
  datos = [];

  pets:any;
  vets:any;
  organizations:any;
  products:any;
  services:any;

  constructor(public navCtrl:NavController,public dataService:DataService,    
            private modalController: ModalController
    ){

  }


  openModal(busqueda){
    this.presentModal(SearchModalPage,busqueda);
  }

  async presentModal(component,busqueda) {
    const modal = await this.modalController.create({
      component: component,
      cssClass: 'my-custom-class',
      componentProps: {
      'busqueda': busqueda,
      'nombre' : 'luis'
     
    }
    });

    modal.onDidDismiss().then( () => {

    });

    return await modal.present();
  }



  onCancel(e){
  }

  buscar( event ) {
    const valor: string = event.detail.value;

    if ( valor.length === 0 ) {
      this.buscando = false;
      this.datos = [];
      return;
    }

    this.buscando = true;

    this.dataService.search( valor )
        .subscribe( resp => {
          console.log(resp);
          if(  ( resp.vets === undefined || resp.vets.length == 0 )
            && ( resp.pets === undefined || resp.pets.length == 0)
            && ( resp.organizations === undefined || resp.organizations.length == 0)  ){
            this.isEmpty = true;
            console.log('que paso pa');
          }else{
            this.isEmpty = false;
          }
            this.vets = resp.vets;
            this.pets = resp.pets;
            this.organizations = resp.organizations;
            this.products = resp.products;
            this.services = resp.services;
            
        });
  }


  goToPage(pagina){
    this.navCtrl.navigateForward(pagina);
  }

}
