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



  /*nuevas variables*/
  perdido = false;
 
  /*nuevas variables*/

  slideOpts = {
    slidesPerView: 1,
  }

   slideOptsVacums = {
    slidesPerView:2.4,
    spaceBetween:10,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }


  constructor(
              private navCtrl: NavController,
              private activatedRoute: ActivatedRoute,
              private dataService: DataService,
              private router:Router ) {
    this.terraceId = this.activatedRoute.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    
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
