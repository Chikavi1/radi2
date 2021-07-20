import { Component, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
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
  index_offset:number = 0;
  searchbar:string = '';
  
  pets:any;
  vets:any;
  organizations:any;
  products:any;
  services:any;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

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

  loadData(e) {
    console.log('se activo el infinito')
    this.dataService.search(this.searchbar, this.index_offset)
      .subscribe(resp => {
        console.log(resp);
        if ((resp.vets === undefined || resp.vets.length == 0)
          && (resp.pets === undefined || resp.pets.length == 0)
          && (resp.organizations === undefined || resp.organizations.length == 0)) {
          this.isEmpty = true;
          console.log('que paso pa');
        } else {
          this.isEmpty = false;
        }

        this.vets = this.vets.concat(resp.vets);
        this.pets = this.pets.concat(resp.pets);
        this.organizations = this.organizations.concat(resp.organizations);
        this.products = this.products.concat(resp.products);
        this.services = this.services.concat(resp.services);

        this.index_offset += 5;

        this.toggleInfiniteScroll();
      });
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  buscar( event ) {
    const valor: string = event.detail.value;
    this.searchbar = valor;

    if ( valor.length === 0 ) {
      this.buscando = false;
      this.datos = [];
      return;
    }

    this.buscando = true;

    this.dataService.search(valor)
      .subscribe(resp => {
        console.log(resp);
        if ((resp.vets === undefined || resp.vets.length == 0)
          && (resp.pets === undefined || resp.pets.length == 0)
          && (resp.organizations === undefined || resp.organizations.length == 0)) {
          this.isEmpty = true;
          console.log('que paso pa');
        } else {
          this.isEmpty = false;
        }
        this.vets = resp.vets;
        this.pets = resp.pets;
        this.organizations = resp.organizations;
        this.products = resp.products;
        this.services = resp.services;

        this.index_offset = 5;

      });

  }


  goToPage(pagina){
    this.navCtrl.navigateForward(pagina);
  }

}
