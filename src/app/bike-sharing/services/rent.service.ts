import { Injectable } from '@angular/core';
import { Http,Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Rent } from '../structDb'

@Injectable()
export class RentService {

  constructor(private http: Http) { }

  saveRent(rent){
    return this.http.post('http://localhost:8080/api/SaveRent/', rent)
            .map((response: Response) => {response.json()})
  }

  updateRent(rent){
    return this.http.post('http://localhost:8080/api/UpdateRent/', rent)
              .map((response: Response) =>response.json())
  }

  getAllRent():Observable<Rent[]>{
    return this.http.get('http://localhost:8080/api/getAllRent/')
              .map((response: Response) => response.json())
  }

  getUserRent(nameUser):Observable<Rent[]>{
     return this.http.post('http://localhost:8080/api/getUserRent/',{'nomeUtente': nameUser})
          .map((response: Response) =>response.json())
   }

  getBikeRent(nameUser, codeBike, timeEnd){
     return this.http.post('http://localhost:8080/api/getBikeRent/',{'nomeUtente': nameUser,
     'codeBike': codeBike, 'timeEnd': timeEnd}).
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
