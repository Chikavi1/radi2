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
  return this.http.get(this.DEVELOPMENT_URL+'pets/show/'+id );
}

getpetsnear(lat,lng,status):any{
  return this.http.get(this.DEVELOPMENT_URL+'near_pets/'+lat+'/'+lng+'/'+status );

}

search( texto: string ):any {
  return this.http.get(this.DEVELOPMENT_URL+'search_things/'+texto );
}

getVeterinarian(id):any{
  return this.http.get(this.DEVELOPMENT_URL+'get_vet/'+id );
}

getReviews(id):any{
  return this.http.get(this.DEVELOPMENT_URL+'get_reviews/'+6);
}

getPaymentMethod():any{
  return this.http.get(this.DEVELOPMENT_URL+'retrieve_payments/' );
}

getReservation():any{
  return this.http.get(this.DEVELOPMENT_URL+'get_reservations_user/1' );
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
    lat: 20.6486206087280,
    lng: -103.35147949437090
  }
  let headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  let options = {
    headers: headers
  }

  return this.http.get(this.DEVELOPMENT_URL + 'near_vets_score/'+datos.lat+'/'+datos.lng );
}


getHours(id,day):any{
  let datos = {
    "idVet": id,
    "day": day,
  }
  console.log(datos);
  return this.http.post(this.DEVELOPMENT_URL+'prereservation',datos);
  // return this.http.get('https://mocki.io/v1/3768322f-f686-4d29-b117-601b54d30172');
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
    return this.http.post(this.DEVELOPMENT_URL+'api/login',{
      "email": email,
      "password": password,
    });
  }

  register(data){
    return this.http.post(this.DEVELOPMENT_URL+'api/register',data);
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



  // cus_JflvtvjRFHD3op

  // stripe functions
  createCostumer(token,email,name):any
  {
    return this.http.get(this.DEVELOPMENT_URL+'createCostumer/'+token+'/'+email+'/'+name);
  }


  getCostumer(costumer_id):any
  {
    return this.http.get(this.DEVELOPMENT_URL+'getCostumer/'+costumer_id);
  }

  getCards(customer_id):any
  {
    return this.http.get(this.DEVELOPMENT_URL+'getCards/'+customer_id);
  }

  getCard(customer_id,card):any
  {
    return this.http.get(this.DEVELOPMENT_URL+'getCard/'+customer_id+'/'+card);

  }

  addcard(customer_id,token):any
  {
    return this.http.get(this.DEVELOPMENT_URL+'addCard/'+customer_id+'/'+token);

  }

  updateDefaultCard(customerId,cardId):any
  {
    return this.http.get(this.DEVELOPMENT_URL+'updateCostumer/'+customerId+'/'+cardId);

  }
  deleteCard(customerId,cardId):any
  {
    return this.http.get(this.DEVELOPMENT_URL+'deleteCard/'+customerId+'/'+cardId);

  }


}
