import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name;
  email;
  password;
  password_confirm;
  showPassword;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  register(){
    console.log(this.name,this.email,this.password,this.password_confirm);
  }

  exit(){
    this.modalCtrl.dismiss();
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

}
