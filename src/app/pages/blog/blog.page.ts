import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit {
  blogs:any;
  segmentModel = "favorites";


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

  constructor(private dataService: DataService,
            private navCtrl: NavController
    ){
    
     this.dataService.getBlogs().subscribe(
      data => {
      console.log(data);
      this.blogs = data;
        })
  }

  goToPage(pagina){
    this.navCtrl.navigateForward(pagina);
  }

  ngOnInit() {
  }


  segmentChanged(event){
    console.log(this.segmentModel);
    console.log(event);
  }

}
