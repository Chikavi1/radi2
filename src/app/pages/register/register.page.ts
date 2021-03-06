import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormBuilder, Validators } from "@angular/forms";
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  
  constructor(
    private toastController: ToastController,
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    private router: Router,
    private data:DataService)
    {


     }


  registrationForm = this.formBuilder.group({
    name: ['',[ Validators.required, Validators.minLength(3)]],
    password: ['',[ Validators.required, Validators.minLength(6)]],
    email: ['',[ Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
  ]],
    phone: ['',[ Validators.required, 
      Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')
    ]]
  });


  contra;
  showPassword;



  get name() {
    return this.registrationForm.get("name");
  }
  get email() {
    return this.registrationForm.get("email");
  }
  get phone() {
    return this.registrationForm.get('phone');
  }
  get password() {
    return this.registrationForm.get('password');
  }




  public errorMessages = {
    name: [
      { type: 'required', message: 'Nombre es obligatorio.' },
      { type: 'minlength', message: 'Nombre no puede ser menor a 3 caracteres.' }
    ],
    email: [
      { type: 'required', message: 'Email es obligatorio.' },
      { type: 'pattern', message: 'Ingresa una dirección de correo valida.' }
    ],
    phone: [
      { type: 'required', message: 'Celular es obligatorio.' },
      { type: 'pattern', message: 'Ingresa un teléfono celular valido' }
    ],
    password:[
      { type: 'required', message: 'contraseña es obligatoria.' },
      { type: 'minlength', message: 'contraseña no puede ser menor a 6 caracteres.' }
    ]
  };



  exit(){
    this.modalCtrl.dismiss();
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  public submit() 
  {

    let customer_id;

    this.data.createCostumer({  
      name: this.registrationForm.value.name, 
      email:this.registrationForm.value.email,
      phone: this.registrationForm.value.phone
        }).
      subscribe( data => {
        customer_id = data.id;
        localStorage.setItem('customer_id',data.id);
      });

    this.data.register(this.registrationForm.value,customer_id).subscribe( (data:any) => {
      this.presentToast(data.mensaje,"success");
      localStorage.setItem('user_id',data.id);
      this.router.navigateByUrl('/');
      this.exit();
 

    },error => {
      console.log(error.error.mensaje);
      let mensaje:any = error.error.mensaje;
      this.presentToast(""+mensaje,"danger");

    })

    
  
  }


  async presentToast(data,color) {
    const toast = await this.toastController.create({
      message: data,
      duration: 1500,
      color: color
    });
    toast.present();
  }

}
