import { Injectable } from '@angular/core';
import { Http,Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Prenotazione } from '../prenotazione'

@Injectable()
export class PrenotationService {

  constructor(private http: Http) { }

/*
  savePrenotation(prenotation){
    return this.http.post('http://localhost:8080/api/SavePrenotation/', prenotation)
            .map((response: Response) =>response.json())
  }
  */

/*
nomeUtente: { type: String, required: true },
 nomeBici: { type: String, required: true },
 data: { type: String, required: true },

  result.timeInit, result.timeEnd,
    rentContent.nameUser, rentContent.nomeBike, todayString
    */

  savePrenotation(timeStart: string, timeEnd: string, nameUser: string, nomeBike: string, todayString: string){
    const prenotation = {
      timeInit: timeStart,
      timeEnd: timeEnd,
      nomeUtente: nameUser,
      nomeBici: nomeBike,
      data: todayString
    }
    return this.http.post('http://localhost:8080/api/SavePrenotation/', prenotation)
            .map((response: Response) =>response.json())
  }

  getAllPrenotation(){
    alert("getAllPrenotation")
    return this.http.get('http://localhost:8080/api/getAllPrenotation/')
              .map((response: Response) => response.json())
  }

  modifyStatePrenotation(id, timeInit, timeEnd){
     return this.http.post('http://localhost:8080/api/modifyStatePrenotation/',{'id': id,
     'timeInit': timeInit, 'timeEnd': timeEnd}).map((response: Response) =>response.json())
   }

 deletePrenotation(id){
    return this.http.post('http://localhost:8080/api/deletePrenotation/',{'id': id})
            .map((response: Response) =>response.json())
  }
}
