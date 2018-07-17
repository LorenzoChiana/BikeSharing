import { Injectable } from '@angular/core';
import { Http,Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Rack } from '../structDb'

@Injectable()
export class RackService {

  constructor(private http: Http) { }

  getAllRack(){
    return this.http.get('http://localhost:8080/api/getAllRack/')
              .map((response: Response) => response.json())
  }

  getRack(idRack):Observable<Rack>{
    return this.http.post('http://localhost:8080/api/getRack/',{'_id': idRack})
              .map((response: Response) =>response.json())
  }

  getRackByCode(codeRack):Observable<Rack[]>{
    return this.http.post('http://localhost:8080/api/getRackByCode/',{'codeRack': codeRack})
              .map((response: Response) =>response.json())
  }

  modifyBikeRack(id, numBike){
    return this.http.post('http://localhost:8080/api/modifyBikeRack/',{'_id': id, 'numBike': numBike})
              .map((response: Response) =>response.json())
  }

  updateRack(rack){
    return this.http.post('http://localhost:8080/api/UpdateRack/', rack)
              .map((response: Response) =>response.json())
  }

  saveRack(rack){
     return this.http.post('http://localhost:8080/api/SaveRack/', rack)
             .map((response: Response) =>response.json())
   }

   deleteRack(id){
    return this.http.post('http://localhost:8080/api/deleteRack/',{'_id': id})
            .map((response: Response) =>response.json())
  }
}
