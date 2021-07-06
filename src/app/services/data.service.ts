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

   headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

   options = {
    headers: this.headers
  }


// codigo solo de prueba eliminar despues



updateProduct(datos):any{
  console.log(datos);

  return this.http.put(this.DEVELOPMENT_URL+'update_product',JSON.parse(JSON.stringify(datos)),this.options);
}

// PETS

getPets( id ):any{
  return this.http.get(this.DEVELOPMENT_URL+'pets/user/'+id );
}


createDog(datos):any{

  console.log(datos);
 

  // datos.photo = img;

  return this.http.post(this.DEVELOPMENT_URL+'pets/store',JSON.parse(JSON.stringify(datos)),this.options).subscribe( data => console.log(data));
}

getPet(id):any{
  return this.http.get(this.DEVELOPMENT_URL+'pets/show/'+id );
}

getpetsnear(lat,lng,status):any{
  return this.http.get(this.DEVELOPMENT_URL+'near_pets/'+lat+'/'+lng+'/'+status );

}


// search

search( texto: string ):any {
  return this.http.get(this.DEVELOPMENT_URL+'search_things/'+texto );
}


// VETS

  getVeterinarian(id):any{
    return this.http.get(this.DEVELOPMENT_URL+'get_vet/'+id );
  }

// reviews
  getReviews(id):any{
    return this.http.get(this.DEVELOPMENT_URL+'get_reviews/'+id);
  }

// productos
   getProducts(id):any{
    return this.http.get(this.DEVELOPMENT_URL+'get_products/'+id);
  }

  getServices(id):any{
    return this.http.get(this.DEVELOPMENT_URL+'get_services/'+id);
  }

  getPaymentMethod():any{
    return this.http.get(this.DEVELOPMENT_URL+'retrieve_payments/' );
  }

  getReservation():any{
    return this.http.get(this.DEVELOPMENT_URL+'get_reservations_user/1' );
  }



uploadImage( photo ):any{
  const options: FileUploadOptions = {

    fileKey: 'photo',
    headers: {
    }
  };


  const fileTransfer: FileTransferObject = this.fileTransfer.create();

  fileTransfer.upload(photo, this.DEVELOPMENT_URL+'upload_img',options ).then( data => {

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

  return this.http.get(this.DEVELOPMENT_URL+'near_vets/'+datos.lat+'/'+datos.lng );
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


  verifiedReserve(day,bussiness_id):any{
    console.log(this.DEVELOPMENT_URL+'/api/v1/validateReserve?bussiness_id='+bussiness_id+'&day='+day);
    return this.http.get(this.DEVELOPMENT_URL+'/api/v1/validateReserve?bussiness_id='+bussiness_id+'&day='+day);
  }
  getReserves(id):any{
    return this.http.get(this.DEVELOPMENT_URL+'/api/v1/getReserves/'+id);
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

  register(data,customer_id){
    let datos = {
      name: data.name,
      password: data.password,
      email: data.email,
      phone: data.phone,
      customer: customer_id
    }

    // console.log(datos);
    // return data;
    return this.http.post(this.DEVELOPMENT_URL+'api/register',datos);
  }

  get_user(token){
    var header = {
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
        .set('Authorization',  `Bearer ${token}`)
    }

    return this.http.get(this.DEVELOPMENT_URL+'/api/auth/user',header);
  }

  logout(token):any{
    var header = {
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
        .set('Authorization',  `Bearer ${token}`)
    }
    return this.http.get(this.DEVELOPMENT_URL+'/api/auth/logout',header);
  }



  // cus_JflvtvjRFHD3op

  // stripe functions


  createCostumer(data):any
  {
 
  return this.http.post(this.DEVELOPMENT_URL+'createCostumer',JSON.parse(JSON.stringify(data)),this.options);

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

  addcard(customer,token):any
  {
    return this.http.post(this.DEVELOPMENT_URL+'addCard',JSON.parse(JSON.stringify({
        customer: customer,
        token: token
      })),this.options);
  }

  updateDefaultCard(customerId,cardId):any
  {
    return this.http.get(this.DEVELOPMENT_URL+'updateCostumer/'+customerId+'/'+cardId);

  }
  deleteCard(customerId,cardId):any
  {
    return this.http.get(this.DEVELOPMENT_URL+'deleteCard/'+customerId+'/'+cardId);

  }

  createToken(data){
    return this.http.post(this.DEVELOPMENT_URL+'createToken',JSON.parse(JSON.stringify(data)),this.options);

  }

  createCharge(data){
    return this.http.post(this.DEVELOPMENT_URL+'createCharge',JSON.parse(JSON.stringify(data)),this.options);
  }

}
