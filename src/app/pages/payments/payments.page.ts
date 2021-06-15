import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage {

  constructor(
    public data:DataService
  ){





   }


  // 
  verifica_costumer(){

    // si tengo costumer haz esto
    let costumer_id = localStorage.getItem('costumer_id');

    let token = '';
    let email = 'chikavi@hotmail.com';
    let name  = 'francisco rojas';


    if(costumer_id){
      this.data.getCostumer(costumer_id).subscribe( data => {
          // to do
      });
    }else{
      this.data.createCostumer(token,email,name).subscribe( data => {
        // todo
      });
    }
    
    // en caso contrario crea costumer
    

  }


}
