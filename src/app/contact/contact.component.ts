import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  lat: number = 44.1493031;
  lng: number = 12.192423;

  zoom: number = 12;

  constructor() { }

  ngOnInit() {
  }

}
