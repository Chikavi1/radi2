import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CalendarComponentOptions, DayConfig } from 'ion2-calendar';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-calendar-reservation',
  templateUrl: './calendar-reservation.page.html',
  styleUrls: ['./calendar-reservation.page.scss'],
})
export class CalendarReservationPage implements OnInit {

 
  optionsRange:CalendarComponentOptions;

  public disabledDates: Date[] = [new Date(2021, 4, 25)];
 


   activarChip;
   habilitaBoton = false;
 
   diaSeleccionado;
   horaSeleccionada;
   horasDisponibles;


   type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
    extras;
  

  constructor( private DataService: DataService,
               private navCtrl: NavController,
               private router: Router) 
  {

    this.extras = this.router.getCurrentNavigation().extras.state;
    console.log(this.extras);


    let _daysConfig: DayConfig[] = [];
    for (let i = 0; i < 15; i++) {
      _daysConfig.push({
        date: new Date(2021, 4, i + 1),
        subTitle: `$${i + 1}`,
        disable: ( i == 25 )?true:false,
        cssClass: 'my-cal'

      })
    }


    this.optionsRange = {
      color: 'danger',
      disableWeeks: [0],
      weekdays: ['D', 'L', 'M', 'I', 'J', 'V', 'S'],
      daysConfig: _daysConfig
    };

   }



  ngOnInit() {

  }

 

  
  onChange($event) {
    this.diaSeleccionado = $event.format('YYYY-MM-DD HH:mm:ss');
    console.log(this.diaSeleccionado);
    this.DataService.getHours(this.extras.veterinarian_id,this.diaSeleccionado).subscribe( ( data ) => {
      this.horasDisponibles = data;
    });

  }

  setIndex(index,hour) {
    this.horaSeleccionada = hour;
    this.habilitaBoton = true;
    this.activarChip = index;
  }



  goOrder(){
    let navigationExtras: NavigationExtras = {
      state: {
        veterinarian_id: this.extras.veterinarian_id,
        veterinarian_name: this.extras.veterinarian_name,
        veterinarian_account: this.extras.veterinarian_account,
        date: this.diaSeleccionado,
        hour: this.horaSeleccionada,
        service_id: this.extras.service_id,
        price: this.extras.price
      } 
    };

    this.navCtrl.navigateForward(`/order`,navigationExtras);
  }

  beforePage(){
    this.navCtrl.back();
  }


}
