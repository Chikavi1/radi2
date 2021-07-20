import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-adopcion-status',
  templateUrl: './adopcion-status.page.html',
  styleUrls: ['./adopcion-status.page.scss'],
})
export class AdopcionStatusPage {
  status;
  datos:any = [];

  constructor(private navCtrl:NavController,private router: Router,private api:DataService){
    this.status = this.router.getCurrentNavigation().extras.state.status;

    console.log(this.status);

    this.api.getResponseAdoptions(1).subscribe( 
      data => {
        this.datos = data;
      }
    )}


  beforePage(){
    this.navCtrl.back();
  }

}
