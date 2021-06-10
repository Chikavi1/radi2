import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-veterinarians',
  templateUrl: './veterinarians.page.html',
  styleUrls: ['./veterinarians.page.scss'],
})
export class VeterinariansPage implements OnInit {
veterinarianId = null;
veterinarian = [];
servicesVet = [];

  constructor(
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService){
    this.veterinarianId = this.activatedRoute.snapshot.paramMap.get('id');
    this.dataService.getVeterinarian(this.veterinarianId).subscribe( data => {
      this.veterinarian = data;
      var servicios = data.services;
      this.servicesVet = servicios.split(',');
      console.log(this.servicesVet);

    });
      
   }

  ngOnInit() {
  }


  goReservationCalendar(){
    this.navCtrl.navigateForward(`/calendar-reservation`);
  }


  mandarMensaje(){
    this.navCtrl.navigateForward(`/chat`);

  }


}
