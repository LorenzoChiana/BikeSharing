import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  private latitudine: number = 44.139771;
  private longitudine: number = 12.243437;
  private zoom: number = 16;

  constructor() { }

  ngOnInit() {
    
  }

}
