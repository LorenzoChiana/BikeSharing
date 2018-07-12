import { Injectable } from '@angular/core';
import { Http,Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Rent } from '../structDb'

@Injectable()
export class RentService {

  constructor(private http: Http) { }

  saveRent(todayString: string, nameUser: string, codeBike: string, timeStart: string, timeEnd: string){
    const rent = {
      data: todayString,
      nameUser: nameUser,
      codeBike: codeBike,
      timeInit: timeStart,
      timeEnd: timeEnd
    }

    return this.http.post('http://localhost:8080/api/SaveRent/', rent)
            .map((response: Response) => {
              response.json()
            })
  }

  getAllRent(){
    return this.http.get('http://localhost:8080/api/getAllRent/')
              .map((response: Response) => response.json())
  }

  getUserRent(nameUser){
     return this.http.post('http://localhost:8080/api/getUserRent/',{'nomeUtente': nameUser}).
     map((response: Response) =>response.json())
   }

  modifyStateRent(id, timeInit, timeEnd){
     return this.http.post('http://localhost:8080/api/modifyStateRent/',{'_id': id,
     'timeInit': timeInit, 'timeEnd': timeEnd}).map((response: Response) =>response.json())
   }

 deleteRent(id){
    return this.http.post('http://localhost:8080/api/deleteRent/',{'_id': id})
            .map((response: Response) =>response.json())
  }
}
