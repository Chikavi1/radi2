import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {  ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {
  title = 'app';
  elementType = 'url';
  createdCode;
  constructor(private navCtrl: NavController,private route:ActivatedRoute) {

    this.route.queryParams.subscribe(params =>{
      this.createdCode = params.invoice;
      console.log(this.createdCode);
    });
   }

  ngOnInit() {
  }

  goHome(){
    this.navCtrl.navigateBack('/tabs/index');
  }

}
