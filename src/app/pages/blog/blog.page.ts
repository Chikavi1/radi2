import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit {
  segmentModel = "adopciones";
  petsNear:any = [];

  slide = {
    slidesPerView:  1.3,
    spaceBetween:10,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }

  mostrar = false;
  organizations:any = [];


  constructor(private dataService: DataService,
            private navCtrl: NavController
    ){
    
      setTimeout(() => {
        this.mostrar = true;
       }, 3200);


       dataService.getpetsnear(20.620623,-103.305768,2).subscribe( data => {
        this.petsNear = data;
        console.log(data);
       });

  }

  goToPage(pagina){
    this.navCtrl.navigateForward(pagina);
  }

  ngOnInit() {
  }


  segmentChanged(event){
    
  }

}
