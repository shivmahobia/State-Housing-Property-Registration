import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http : HttpClient) { }

  profileUpload(data: any){
    return this.http.post(environment.apiUrlProfileUpload,data);
   }


   FormData(data: any){
    return this.http.post(environment.apiUrlFormdataUpload,data);
   }

   Payment(data: any){
    return this.http.post(environment.payment,data);
   }


   
   profileById(id:any){
    return this.http.get(environment.apiUrl+id).pipe(tap(res => { res }),
    catchError(e => {        
      throw new Error(e);
    })
  );
   }

   Updateprofile(id:any,data:any){
    return this.http.put(environment.apiUrlUserProfileUpdate+id,data).pipe(tap(res => { res
    }),
    catchError(e => {        
      throw new Error(e);
    })
  );
  }



}

