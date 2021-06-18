import { Component} from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-veterinarians',
  templateUrl: './veterinarians.page.html',
  styleUrls: ['./veterinarians.page.scss'],
})
export class VeterinariansPage {
veterinarianId = null;
veterinarian = [];
servicesVet = [];
reviews = [];


  constructor(
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService){
    this.veterinarianId = this.activatedRoute.snapshot.paramMap.get('id');

    this.dataService.getVeterinarian(this.veterinarianId).subscribe( data => {
      this.veterinarian = data;
      var servicios = data.services;
      if(servicios){
        this.servicesVet = servicios.split(',');
      }
    });

    this.dataService.getReviews(this.veterinarianId).subscribe( data => {
      this.reviews = data;
      console.log(this.reviews);
    });

      
   }



  goReservationCalendar(id,name){

    let navigationExtras: NavigationExtras = {
      state: {
        veterinarian_id: id,
        veterinarian_name: name,
      } 
    };




    this.navCtrl.navigateForward(`/calendar-reservation`,navigationExtras);
  }


  


}
