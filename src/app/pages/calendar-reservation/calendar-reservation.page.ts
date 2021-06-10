import { Component, OnInit } from '@angular/core';
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

 
obtenerHoras(){
    this.DataService.getHours().subscribe( ( data ) => {
      console.log(data);
      this.horasDisponibles = data;
    });
  }

  onChange($event) {
    this.diaSeleccionado = $event;

    this.DataService.getHours2().subscribe( ( data ) => {
      console.log(data);
      this.horasDisponibles = data;
    });

    console.log($event);
  }

  setIndex(index,hour) {
    this.horaSeleccionada = hour;
    this.habilitaBoton = true;
    this.activarChip = index;
  }



  goOrder(){
    this.navCtrl.navigateForward(`/order`);
  }

}
