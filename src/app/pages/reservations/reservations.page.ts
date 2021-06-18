import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {
  segmentModel = "pendientes";

  datos:any;
  completados:any = [];
  pendientes:any   = [];

  constructor(public navCtrl:NavController,
              private data: DataService
    ){


    this.data.getReservation().subscribe( data => {

      this.datos = data;      
      console.log(this.datos);
      this.datos.forEach(element => {

        if( element.status === 1){
          this.pendientes = this.pendientes.concat(element);
        }

        if( element.status === 2){
           this.completados = this.completados.concat(element);
        }

      });
      
    });
    

   }

  ngOnInit() {
  }

  goToPage(pagina){
    this.navCtrl.navigateForward(pagina);
  }

  segmentChanged(event){
  }

}
