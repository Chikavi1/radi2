import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import * as Leaflet from 'leaflet';
import { MapModalPage } from '../map-modal/map-modal.page';

declare var L: any;

@Component({
  selector: 'app-organization',
  templateUrl: './organization.page.html',
  styleUrls: ['./organization.page.scss'],
})
export class OrganizationPage  {
  map: Leaflet.Map;
  mapa: any;


  id = 1;

  organization:any = {};
  pets:any = [];
  similarOrganizations:any = [];
  totalPets = 0;

  slide = {
    slidesPerView: 1.1,
    spaceBetween: 10,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }
  
  constructor(private navCtrl:NavController,
              private api:DataService,
              private modalController:ModalController){
    this.api.getOrganization(this.id).subscribe( 
      (data:any) => {
        this.organization = data[0];
      }
    )

    this.api.getPetsbyOrganization(this.id).subscribe(
      (data:any) => {
        console.log( data.length );
        this.totalPets = data.length;
        this.pets = data;
        console.log(data);
      }
    )


    this.api.getSimilarOrganizations(this.id).subscribe(
      (data) => {
        this.similarOrganizations = data;
        console.log(data);
      }
    )
   }

   ionViewDidEnter() { this.leafletMap(); }


  beforePage(){
    this.navCtrl.back();
  }

  goToPage(pagina){
    this.navCtrl.navigateForward(pagina);
  }


  leafletMap() {
    let lat = 20.620575;
    let lng =  -103.305554;
    
    this.mapa = Leaflet.map('mapId').setView([lat, lng], 11);
      var vetIcon = L.icon(
        {
          iconUrl: 'https://i.ibb.co/Q6SLBKF/veterinarian.png',
          shadowUrl: 'https://i.ibb.co/Q6SLBKF/veterinarian.png',
          iconSize:     [25, 41],
          shadowSize:   [41, 41] 
        });
      
      Leaflet.marker([lat,lng],{icon: vetIcon}).addTo(this.mapa).bindPopup('Organización');
      Leaflet.tileLayer('https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga', {
      zoom: 14,
      maxZoom: 18,
      minZoom: 4,
      minResolution: 4891.96981025128,
      maxResolution: 39135.75848201024,
      doubleClickZoom: true,
      center: [lat, lng]
      }).addTo(this.mapa);
  
      this.mapa.dragging.disable()
      this.mapa.touchZoom.disable();
      this.mapa.doubleClickZoom.disable();
      this.mapa.scrollWheelZoom.disable();
      this.mapa.boxZoom.disable();
      this.mapa.keyboard.disable();
    }

    openMap(){
      setTimeout(() => {
        this.presentModal(MapModalPage);
     }, 300);
    }

    async presentModal(component) {
      const modal = await this.modalController.create({
        component: component,
      });
      modal.onDidDismiss().then(()=>{
       
      });
      return await modal.present();
    }

}
