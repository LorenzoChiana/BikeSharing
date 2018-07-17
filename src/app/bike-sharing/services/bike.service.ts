import { Injectable } from '@angular/core';
import { Http,Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Bike } from '../structDb'

@Injectable()
export class BikeService {

  constructor(private http: Http) { }

  getAllBike():Observable<Bike[]>{
    return this.http.get('http://localhost:8080/api/getAllBike/')
              .map((response: Response) => response.json())
  }

  getBike(id):Observable<Bike>{
    return this.http.post('http://localhost:8080/api/getBike/', {'_id': id})
              .map((response: Response) =>response.json())
  }

  getRackBike(rackCode):Observable<Bike[]> {
    return this.http.post('http://localhost:8080/api/getRackBike/', {'rackCode': rackCode})
              .map((response: Response) =>response.json())
  }

  getRackBikeAll(rackCode):Observable<Bike[]> {
    return this.http.post('http://localhost:8080/api/getRackBikeAll/', {'rackCode': rackCode})
              .map((response: Response) =>response.json())
  }

  getUseBike(rackCode){
    return this.http.post('http://localhost:8080/api/getUseBike/', {'rackCode': rackCode})
              .map((response: Response) =>response.json())
  }

  getUserBike(nameUser){
    return this.http.post('http://localhost:8080/api/getUserBike/', {'stato': nameUser})
              .map((response: Response) =>response.json())
  }

  modifyStateBike(id, stato, rack){
    return this.http.post('http://localhost:8080/api/modifyStateBike/',{'_id': id, 'stato': stato, 'rack': rack})
             .map((response: Response) =>response.json())
   }

   updateBike(bike){
     return this.http.post('http://localhost:8080/api/UpdateBike/', bike)
             .map((response: Response) =>response.json())
   }

   saveBike(bike){
     return this.http.post('http://localhost:8080/api/SaveBike/', bike)
             .map((response: Response) =>response.json())
   }

   deleteBike(id){
    return this.http.post('http://localhost:8080/api/deleteBike/',{'_id': id})
            .map((response: Response) =>response.json())
  }

  private extractData(res: Response) {
       if (res.status < 200 || res.status >= 300) {
             throw new Error('Bad response status: ' + res.status);
           }
       let body = res.json();
       return body.data || { };
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

    /* versione promise */
    /*
    getAllBike(){
      return this.http.get<Bike[]>('http://localhost:8080/api/getAllBike/')
                .toPromise();
    }
    */

    /*
    getRackBike(rackCode) {
      return this.http.post<Bike[]>('http://localhost:8080/api/getRackBike/', {'rackCode': rackCode})
      .toPromise();
    }
    */

}
