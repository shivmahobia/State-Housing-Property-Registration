import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }


  post(serviceName: any, data: any){

    

    const headers = new HttpHeaders();
  

    const url = environment.apiUrl + serviceName;

    return this.http.post(url, data, { headers, withCredentials: false });

  }
}
