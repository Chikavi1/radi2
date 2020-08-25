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
}
  

  beforePage(){
    this.navCtrl.navigateBack('/tabs/tab1');
  }

  NextPage(){

    this.navCtrl.navigateForward(['/adopcion']);
  }
}
