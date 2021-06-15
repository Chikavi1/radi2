import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import 'leaflet-routing-machine';

declare var L: any;

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.page.html',
  styleUrls: ['./map-modal.page.scss'],
})
export class MapModalPage implements OnInit {

  map: Leaflet.Map;
  mapa: any;

  constructor() { }

  ngOnInit() {
  }


  ionViewDidEnter() { this.leafletMap(); }

  leafletMap() {

    let lat = 20.620575;
    let lng =  -103.305554;
  
    let PointA_lat = 20.620575;
    let PointA_lng =  -103.305554;
  
  
    let PointB_lat = 20.651921;
    let PointB_lng =  -103.336855;
  
  
      this.mapa = Leaflet.map('map').setView([lat, lng], 11);
      var vetIcon = L.icon(
        {
          iconUrl: 'https://i.ibb.co/Q6SLBKF/veterinarian.png',
          shadowUrl: 'https://i.ibb.co/Q6SLBKF/veterinarian.png',
          iconSize:     [25, 41], // size of the icon
          shadowSize:   [41, 41] // size of the shadow
        });
        var homeICon = L.icon(
          {
            iconUrl: '        https://i.ibb.co/7JTcSnJ/pet-house.png',
            shadowUrl: '        https://i.ibb.co/7JTcSnJ/pet-house.png',
            iconSize:     [25, 41], // size of the icon
            shadowSize:   [41, 41] // size of the shadow
          });
  
          var customOptions =
          {
          'maxWidth': '400',
          'width': '200',
          'background':'red',
          'className' : 'popupCustom'
          }

      Leaflet.marker([20.620575,-103.305554],{icon: homeICon}).addTo(this.mapa).bindPopup('Ubicación',customOptions);
      Leaflet.marker([20.651921,-103.336855],{icon: vetIcon}).addTo(this.mapa).bindPopup('Veterinaria');

      Leaflet.tileLayer('https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga', {
      zoom: 8,
      zoomControl: false,
      maxZoom: 18,
      minZoom: 4,
      minResolution: 4891.96981025128,
      maxResolution: 39135.75848201024,
      doubleClickZoom: true,
      center: [lat, lng]
      }).addTo(this.mapa);
  


      Leaflet.Routing.control({
        waypoints: [
          Leaflet.latLng(PointA_lat, PointA_lng),
          Leaflet.latLng(PointB_lat, PointB_lng)
        ],
        lineOptions: {
          styles: [{color: '#17202F', opacity: 1, weight: 5}]
       },routeWhileDragging: false,
       createMarker: function(i, wp, nWps) {
        return null;
      }

      }).addTo(this.mapa);


    // this.map = Leaflet.map('map').setView([20.615457, -103.303546], 16);
    // Leaflet.tileLayer('https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga', {
    // }).addTo(this.map);

    // // Leaflet.marker([28.6, 77]).addTo(this.map).bindPopup('Delhi').openPopup();
    // // Leaflet.marker([34, 77]).addTo(this.map).bindPopup('Leh').openPopup();

    // antPath([[20.620626, -103.305506], [20.615457, -103.303546]],
    //   { color: '#FF0000', weight: 5, opacity: 0.6 })
    //   .addTo(this.map);






  }




}
