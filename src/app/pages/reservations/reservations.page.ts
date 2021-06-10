import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {
  segmentModel = "all";

  constructor(public navCtrl:NavController) { }

  ngOnInit() {
  }

  goToPage(pagina){
    this.navCtrl.navigateForward(pagina);
  }

  segmentChanged(event){
    console.log(this.segmentModel);
    console.log(event);
  }

}
