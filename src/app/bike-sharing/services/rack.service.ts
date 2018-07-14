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


    /*
    getDataUsingPromise() {
      this.httpClient.get<Employee>(this.url).toPromise().then(data => {
        this.promiseResult = data;
        console.log('Promise resolved.')
      });
      console.log('I will not wait until promise is resolved..');
    }
    */

    /*
    getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => response.json().data as Hero[])
      .catch(this.handleError);
  }
    */

    /*
    async getHeroes(): Promise<Hero[]> {
    try {
      let response = await this.http
        .get(this.heroesUrl)
        .toPromise();
      return response.json().data as Hero[];
    } catch (error) {
      await this.handleError(error);
    }
  }
    */

    /*
    async getRack(idRack): Rack{
      try {
        let response = this.http.post('http://localhost:8080/api/getRack/',{'id': idRack})
                .toPromise();
        return response.json().data as Rack;
      } catch (error) {
        await this.handleError(error);
      }
    }
    */

    /* versione promise */
    /*
    getRack(idRack){
      return this.http.post('http://localhost:8080/api/getRack/',{'id': idRack})
              .toPromise()
    }
    */


}
