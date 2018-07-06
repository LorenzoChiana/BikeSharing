import { Injectable } from '@angular/core';
import {Http,Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BikeService {

  constructor(private http: Http) { }

  saveBike(bike){
    return this.http.post('http://localhost:8080/api/SaveBike/', bike)
            .map((response: Response) =>response.json())
  }

  getAllBike(){
    return this.http.get('http://localhost:8080/api/getAllBike/')
              .map((response: Response) => response.json())
  }

  modifyStateBike(id, stato){
     return this.http.post('http://localhost:8080/api/modifyStateBike/',{'id': id, 'stato': stato})
             .map((response: Response) =>response.json())
   }

 deleteBike(id){
    return this.http.post('http://localhost:8080/api/deleteBike/',{'id': id})
            .map((response: Response) =>response.json())
  }
}
