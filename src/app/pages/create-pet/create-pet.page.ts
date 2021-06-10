import { Component, ViewChild } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { ImageCroppedEvent, ImageCropperComponent,base64ToFile  } from 'ngx-image-cropper';
import { IonicSelectableComponent } from 'ionic-selectable';
import { DataService } from 'src/app/services/data.service';

declare var window: any;
class Port {
  public id: number;
  public name: string;
}
@Component({
  selector: 'app-create-pet',
  templateUrl: './create-pet.page.html',
  styleUrls: ['./create-pet.page.scss'],
})
export class CreatePetPage {
  @ViewChild('portComponent',{static:false}) portComponent: IonicSelectableComponent;

  @ViewChild(ImageCropperComponent,{ static: false }) angularCropper: ImageCropperComponent;
  valor = 0;
  step  = 0;
  ports: Port[];
  port: Port;
  pais ;
  public edited = false;


  tempImages: string[] = [];
  imagen;
  slide2animation;

  name;
  description;
  size;
  breed;
  gender;
  specie;
  photo;
  code;
  geolocation;

  croppedImage  =  null;

    constructor(
      public actionSheetController: ActionSheetController,
      private camera: Camera,
      public api: DataService
      ) { 

      

        this.slide2animation = {
          path: 'https://assets4.lottiefiles.com/temp/lf20_tsdGdl.json',
          renderer: 'canvas',
          autoplay: true,
          loop: true
        };

        this.ports = [
          { id: 0 , name: "mestizo"},
          { id: 1, name: "Abisinio"},
          { id: 2, name:"Ashera"},
          { id: 3, name: "Australian Mist"},
          { id: 4, name: "Azul Ruso"},
          { id: 5, name: "Balinés"},
          { id: 6, name: "Bengala o Bengalí"},
          { id: 7, name: "Birmano"},
          { id: 8, name: "Bombay"},
          { id: 9, name: "Bosque de Noruega"},
          { id: 10, name: "British shorthair"},
          { id: 11, name: "Burmilla"},
          { id: 12, name: "Burmés"},
          { id: 13, name: "Cartujo o Chartreux"},
          { id: 14, name: "Cornish Rex"},
          { id: 15, name: "Curl Americano"},
          { id: 16, name: "Devon Rex"},
          { id: 17, name: "Europeo"},
          { id: 18, name: "Exótico de pelo corto"},
          { id: 19, name: "Habana"},
          { id: 20, name: "Himalayo"},
          { id: 21, name: "Korat"},
          { id: 22, name: "LaPerm"},
          { id: 23, name: "Lykoi o gato lobo"},
          { id: 24, name: "Maine Coon"},
          { id: 25, name: "Manx"},
          { id: 26, name: "Mau Egipcio"},
          { id: 27, name: "Montés"},
          { id: 28, name: "Munchkin"},
          { id: 29, name: "Nebelung"},
          { id: 30, name: "Ocicat o gato ocelote"},
          { id: 31, name: "Oriental de pelo corto"},
          { id: 32, name: "Oriental de pelo largo o javanés"},
          { id: 33, name: "Persa"},
          { id: 34, name: "Peterbald"},
          { id: 35, name: "Ragdoll"},
          { id: 36, name: "Savannah"},
          { id: 37, name: "Scottish Fold"},
          { id: 38, name: "Selkirk Rex"},
          { id: 39, name: "Shausie"},
          { id: 40, name: "Siamés"},
          { id: 41, name: "Siberiano"},
          { id: 42, name: "Snowshoe"},
          { id: 43, name: "Sokoke"},
          { id: 44, name: "Somalí"},
          { id: 45, name: "Sphynx o Esfinge"},
          { id: 46, name: "Van Turco"}
        ];

       
      }

      setGender(sex){
        this.gender = sex;
      }

      setSpecie(specie){
        this.specie = specie;
      }

  
    saveTodos() {

      let mascota = {
        "name":         this.name,
        "description":  this.description,
        "size":         this.size,
        "breed":        this.breed,
        "gender":       this.gender,
        "specie":       this.specie,
        "photo":        this.photo,
        "geolocation":  this.geolocation
      }

      let result = this.api.uploadImage( mascota.photo );
      console.log(result);
      mascota.photo = "pruebadequeesletmallo";
      console.log(mascota);
      this.api.createDog(mascota);

      this.edited = true;
      
      setTimeout(function() {
          this.edited = false;
      }.bind(this), 3000);
     
    }

    imageCropped(event: ImageCroppedEvent)
    {
      this.croppedImage = event.base64;
      // this.photo = base64ToFile(this.croppedImage);
    }
  
    async presentActionSheet() {
      const actionSheet = await this.actionSheetController.create({
        header: 'Selecciona una opción',
        cssClass: 'my-custom-class',
        buttons: [{
          text: 'Tomar Foto',
          handler: () => {
            this.camara();
          }
        }, {
  
          text: 'Abrir Galeria',
          handler: () => {
            this.libreria();
          }
        }, {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
          }
        }]
      });
      await actionSheet.present();
    }
  
  
    camara(){
  
      const options: CameraOptions = {
        quality: 65,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation:true,
        sourceType: this.camera.PictureSourceType.CAMERA
      }
  
     this.procesarImagen(options);
  
    }
  
    libreria(){
  
      const options: CameraOptions = {
        quality: 65,
        destinationType: this.camera.DestinationType.FILE_URI,
        // destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation:true,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      }
      this.camera.getPicture(options).then( (imageData)  => {
        this.imagen = `data:image/jpeg;base64,` + imageData;
        this.photo = imageData;
      });
    //  this.procesarImagen(options);
    }
  
    procesarImagen(options: CameraOptions ){
      this.camera.getPicture(options).then((imageData) => {
        const img = window.Ionic.WebView.convertFileSrc( imageData );
        this.imagen = img;

        this.photo = imageData;
        // this.tempImages.push( img );
  
      }, (err) => {
      });
    }
    
    save(){
      this.angularCropper.crop();
    }

   
    siguiente(){
      this.valor += .30;
      this.step += 1;

      
      if(this.step === 3){
        this.saveTodos();
      }
    }

    regresar(){
      if( this.valor > 0){
        this.valor -= .33;
      }
      if(this.step > 0){
        this.step -= 1;
      }

    }

    portChange(event: {
      component: IonicSelectableComponent,
      value: any
    }) {
      this.breed = event.value.name;
      console.log('port:', event.value.name);
    }

    ubicacion(){
      this.portComponent.value(1);
      console.log(this.pais);
    }
}
