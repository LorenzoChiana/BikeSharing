import { Injectable } from '@angular/core';
import {Http,Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { User } from './User'

@Injectable()
export class LoginRegService {

  constructor(private http: Http) { }

  private extractData(res: Response) {        
    return res.text() ? res.json() : {}; ;
  }

  saveUser(user) {
    return this.http.post('http://localhost:8080/api/SaveUser/', user)
            .map((response: Response) =>response.json())
  }

 findUser(nomeUtente) {
    return this.http.post('http://localhost:8080/api/FindUser/',{'nomeUtente': nomeUtente}).map(this.extractData)
            /*.map((response: Response) => response.json())*/
  }

  getAllUser(){
    return this.http.get('http://localhost:8080/api/getAllUser/')
                 .map(response => response.json());
  }

// const subscribe = example.subscribe(val => console.log(val));

}

/*
constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${config.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get(`${config.apiUrl}/users/` + id);
    }

    register(user: User) {
        return this.http.post(`${config.apiUrl}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${config.apiUrl}/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/users/` + id);
    }
    */
