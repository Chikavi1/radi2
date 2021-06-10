import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  terraces:any;
  buscando = false;
  datos = [];
  constructor(public dataService:DataService){
    this.dataService.getTerracesNormal().subscribe(
      data => {
       this.terraces = data.data;
       console.log(data.data);
      })
  }


  onCancel(e){
   this.terraces = [];
  }

  buscar( event ) {
    const valor: string = event.detail.value;

    if ( valor.length === 0 ) {
      this.buscando = false;
      this.datos = [];
      return;
    }

    // console.log(valor);
    this.buscando = true;

    this.dataService.search( valor )
        .subscribe( resp => {
          console.log( resp );
         this.datos = resp['results'];
          this.buscando = false;
        });
  }


  buscarCiudad(e){
    if(e.target.value.length > 4){
      console.log(e.target.value);
      this.dataService.search(e.target.value).subscribe(
        data => {
         this.terraces = data.data.data;
         console.log(data.data.data);
        })
    }
  }

}
