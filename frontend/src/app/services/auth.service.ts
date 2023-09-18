import { AuthConstants } from '../config/auth-constants';
import { Injectable } from '@angular/core';
import {Router} from '@angular/router'
import {BehaviorSubject, Observable} from 'rxjs'
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { tap, catchError } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userDataS = new BehaviorSubject<any>('');

  constructor(private httpService: HttpService, private storageService : StorageService, private router: Router,private http : HttpClient) { }


  getUserData(){
    this.storageService.get(AuthConstants.AUTH).then(res => {
      console.log(res);
      this.userDataS.next(res)
    })
  }

  getUserById(id:any){
    return this.http.get(environment.apiUrl+id).pipe(tap(res => { res
    }),
    catchError(e => {        
      throw new Error(e);
    })
  );
  }

  


  postUrl(postDate: any): Observable<any> {
    return this.httpService.post('login', postDate).pipe(tap(res => { res
    }),
    catchError(e => {        
      throw new Error(e);
    })
  );
  
  }

  login(postDate: any): Observable<any> {
    return this.httpService.post('login', postDate).pipe(tap(res => { res
    }),
    catchError(e => {        
      throw new Error(e);
    })
  );
  
  }

  signup(postDate: any): Observable<any> {
    return this.httpService.post('register', postDate).pipe(tap(res => { res
    }),
    catchError(e => {        
      throw new Error(e);
    })
  );;
  }



  forgot(postDate: any): Observable<any> {
    return this.httpService.post('forgotPassword', postDate).pipe(tap(res => { res
    }),
    catchError(e => {        
      throw new Error(e);
    })
  );
  
  }


  applicationForm(postDate: any): Observable<any> {
    return this.httpService.post('application-form', postDate);
  }

  

  logout(){
    this.storageService.removeItem(AuthConstants.AUTH).then(res => {
      this.userDataS.next('');
      this.router.navigate(['']);
    })
  }

  
}
