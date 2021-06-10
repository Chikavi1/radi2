import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  PRODUCTION_URL = 'https://api.radi.pet/';
  DEVELOPMENT_URL = "http://localhost:8080/";
  constructor(private http: HttpClient,private fileTransfer: FileTransfer) { }

// codigo solo de prueba eliminar despues

updateProduct(datos):any{
  console.log(datos);
  let headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  let options = {
    headers: headers
  }
  return this.http.put(this.DEVELOPMENT_URL+'update_product',JSON.parse(JSON.stringify(datos)),options);
}

getPets( id ):any{
  return this.http.get(this.PRODUCTION_URL+'pets/user/'+id );
}

getPet(id):any{
  return this.http.get(this.PRODUCTION_URL+'pets/show/'+id );
}


search( texto: string ):any {
  return this.http.get(this.PRODUCTION_URL+'search?query='+texto );
}

getVeterinarian(id):any{
  return this.http.get(this.PRODUCTION_URL+'get_vet/'+id );
}

getPaymentMethod():any{
  return this.http.get(this.DEVELOPMENT_URL+'retrieve_payments/' );
}




createDog(datos):any{

  console.log('ñññññ');
  console.log(datos);
  console.log('ñññññ');


  let headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  let options = {
    headers: headers
  }

  // datos.photo = img;

  return this.http.post(this.PRODUCTION_URL+'pets/store',JSON.parse(JSON.stringify(datos)),options).subscribe( data => console.log(data));
}

uploadImage( photo ):any{
  const options: FileUploadOptions = {

    fileKey: 'photo',
    headers: {
    }
  };


  const fileTransfer: FileTransferObject = this.fileTransfer.create();

  fileTransfer.upload(photo, this.PRODUCTION_URL+'upload_img',options ).then( data => {

    console.log('se logro');
   

  }).catch( err =>{
    console.log('error en cargar',err);
  } )
}


getVeterinans(){
  let datos = {
    lat: 20.620603,
    lng: -103.305615
  }
  let headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  let options = {
    headers: headers
  }

  return this.http.get('https://api.radi.pet/near_vets/'+datos.lat+'/'+datos.lng );
}


getHours():any{
  return this.http.get('https://mocki.io/v1/3768322f-f686-4d29-b117-601b54d30172');
}

getHours2():any{
return this.http.get('https://mocki.io/v1/8d54ea32-51fb-4685-a162-ea8c8afd1502');
}

// codigo solo de prueba eliminar despues



  getCity(latitude,longitude):any{
    return this.http.get('https://api.opencagedata.com/geocode/v1/json?q=' +latitude+'+'+longitude+'&key=29a47123819f46749a97b03576f4988f ');

  }

  getTerraces(latitude,longitude):any{
    return this.http.get(this.PRODUCTION_URL+'/api/v1/searchByLatLng?latitud='+latitude+'&longitud='+longitude);
  }
  getTerracesNormal():any{
    return this.http.get(this.PRODUCTION_URL+'/api/v1/getBussinesses/');
  }
  getTerrace(id):any{
    return this.http.get(this.PRODUCTION_URL+'/api/v1/getBussiness/'+id);
  }

  verifiedReserve(day,bussiness_id):any{
    console.log(this.PRODUCTION_URL+'/api/v1/validateReserve?bussiness_id='+bussiness_id+'&day='+day);
    return this.http.get(this.PRODUCTION_URL+'/api/v1/validateReserve?bussiness_id='+bussiness_id+'&day='+day);
  }
  getReserves(id):any{
    return this.http.get(this.PRODUCTION_URL+'/api/v1/getReserves/'+id);
  }

  createReservation(bussiness_id,user_id,price,day):any{
    return this.http.get(this.PRODUCTION_URL+'/api/v1/createReservation?bussiness_id='+bussiness_id+'&user_id='+user_id+'&price='+price+'&day='+day);
  }


  getBlogs():any{
    return this.http.get(this.DEVELOPMENT_URL+'/api/getBlogs');
  }




  login(email,password):any{
    return this.http.post(this.PRODUCTION_URL+'/api/auth/login',{
      "email": email,
      "password": password,
    });
  }

  create_user(){
    return this.http.post(this.PRODUCTION_URL+'/api/auth/login',{
      "name": "prueba",
      "email": "chikavi2@hotmail.com",
      "password": "chikavi99",
      "password_confirmation": "chikavi99"
    });
  }

  get_user(token){
    var header = {
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
        .set('Authorization',  `Bearer ${token}`)
    }

    return this.http.get(this.PRODUCTION_URL+'/api/auth/user',header);
  }

  logout(token):any{
    var header = {
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
        .set('Authorization',  `Bearer ${token}`)
    }
    return this.http.get(this.PRODUCTION_URL+'/api/auth/logout',header);
  }

}
