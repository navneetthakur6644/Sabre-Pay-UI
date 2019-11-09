import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../classes/user';
import { Login } from '../classes/login';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class LoginService {
  url: string;
  token: string;
  header: any;

  constructor(private http: HttpClient) {
    this.url = "http://localhost:8080";
    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
   }

   login(login:Login){  
    //debugger;  
    console.log("Entry login method of Login service : "
    + login.email );
   //console.log(JSON.stringify(login));
   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
   return this.http.post<Login[]>(this.url + '/api/login', login, httpOptions)  
  }

  getBalance(): Observable<Object> {  
    return this.http.get(this.url + '/api/getBalance');  
  }

  getTransaction(): Observable<Object> {  
    return this.http.get(this.url + '/api/getTransactions');  
  }

}
