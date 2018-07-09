import { Component, OnInit } from '@angular/core';
import { } from '@types/googlemaps';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  constructor() { }

  ngOnInit() {
  	var lat: number = 44.139771;
   	var lng: number = 12.243437;

   	var markerCenter = new google.maps.LatLng(lat, lng);
    var mapProp = {
      center: new google.maps.LatLng(lat, lng),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
      
    var marker = new google.maps.Marker({
        position: markerCenter
    });
    marker.setMap(this.map);
    
  }

}
