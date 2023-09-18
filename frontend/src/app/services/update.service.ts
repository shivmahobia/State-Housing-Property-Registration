import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private http : HttpClient) { }

  update( id:any,data: any){
    return this.http.put(environment.apiUrl+id,data);
   }


   

}
