import { Component, OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { NavigationExtras, Router } from '@angular/router';
import {Map,tileLayer,marker,icon} from 'leaflet';

@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class ShowPage implements OnInit {
  terraceId = null;
  terrace = [];
  services: any;
  reviews = [];
  images = [];
  private map;
  marker;
  latitude;
  longitude;
  dataParseNextPage;
  /*nuevas variables*/
  perdido = false;
 
  /*nuevas variables*/
  slideOpts = {
    slidesPerView: 1,
  }
  constructor(
              private navCtrl: NavController,
              private activatedRoute: ActivatedRoute,
              private dataService: DataService,
              private router:Router ) {
    this.terraceId = this.activatedRoute.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    
      this.dataService.getTerrace(this.terraceId)
          .subscribe(data => {
            this.terrace = data.data;
            this.services = data.data.services.split(',');
            this.reviews = data.reviews;
            this.images = data.images;
            this.latitude = data.data.latitude;
            this.longitude = data.data.longitude;
            this.dataParseNextPage = 
            {id: data.data.id,name: data.data.name, price: data.data.price,img:data.data.image};
          });
  }
  ionViewDidEnter(){
  this.showMap();
}
  showMap(){
    this.map = new Map('myMap',{attributionControl: false}).setView([this.latitude, this.longitude], 13);
    tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(this.map);
    let iconMarker = icon({iconUrl: "https://image.flaticon.com/icons/png/512/235/235854.png",
    iconSize: [30,30],});
    this.marker = marker([this.latitude, this.longitude],{icon: iconMarker});
    this.marker.addTo(this.map).bindPopup('Hey,jaja');
  }

  beforePage(){
    this.navCtrl.navigateBack('/tabs/tab1');
  }

  NextPage(){

    const extras: NavigationExtras = {
      queryParams:{
        id: this.dataParseNextPage.id,
        name: this.dataParseNextPage.name,
        price: this.dataParseNextPage.price,
        img: this.dataParseNextPage.img
      }
    }
    this.navCtrl.navigateForward(['/available'],extras);
  }
}
