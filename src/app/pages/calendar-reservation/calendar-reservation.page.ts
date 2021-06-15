import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
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
 
  veterinarian_id = 1;
  veterinarian_name = 'vet las huertas';

   activarChip;
   habilitaBoton = false;
 
   diaSeleccionado;
   horaSeleccionada;
 
   horasDisponibles;
   type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'

  constructor( private DataService: DataService, private navCtrl: NavController) {
    let _daysConfig: DayConfig[] = [];
    for (let i = 0; i < 15; i++) {
      _daysConfig.push({
        date: new Date(2021, 4, i + 1),
        subTitle: `$${i + 1}`,
        disable: ( i == 25 )?true:false
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
    this.diaSeleccionado = $event.format('YYYY-MM-DD');

    this.DataService.getHours2().subscribe( ( data ) => {
      console.log(data);
      this.horasDisponibles = data;
    });

  }

  setIndex(index,hour) {
    this.horaSeleccionada = hour;
    this.habilitaBoton = true;
    this.activarChip = index;
  }



  goOrder(){
    console.log(this.diaSeleccionado,this.horaSeleccionada);
    let navigationExtras: NavigationExtras = {
      state: {
        veterinarian_id: this.veterinarian_id,
        veterinarian_name: this.veterinarian_name,
        date: this.diaSeleccionado,
        hour: this.horaSeleccionada
      } 
    };

    this.navCtrl.navigateForward(`/order`,navigationExtras);
  }

}
