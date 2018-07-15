import { Injectable } from '@angular/core';
import { Http,Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Comment } from '../structDb'

@Injectable()
export class CommentService {

  constructor(private http: Http) { }

  saveComment(comment){
    return this.http.post('http://localhost:8080/api/SaveComment/', comment)
            .map((response: Response) => {response.json()})
  }

  getAllComment():Observable<Comment[]>{
    return this.http.get('http://localhost:8080/api/getAllComment/')
              .map((response: Response) => response.json())
  }

  getBikeComment(codeBike){
     return this.http.post('http://localhost:8080/api/getBikeComment/',{'codeBike': codeBike}).
     map((response: Response) =>response.json())
   }
}
