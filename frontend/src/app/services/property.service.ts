import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  id:any
  

  constructor(private http : HttpClient) { }


  project(){
    return this.http.get(environment.apiUrlProject).pipe(tap(res => { res
    }),
    catchError(e => {        
      throw new Error(e);
    })
  );
  }

  projectId(id:any){
    return this.http.get(environment.apiUrlProject+id).pipe(tap(res => { res
    }),
    catchError(e => {        
      throw new Error(e);
    })
  );
  }


  property(){
    return this.http.get(environment.apiUrlProperty).pipe(tap(res => { res
    }),
    catchError(e => {        
      throw new Error(e);
    })
  );
  }

  propertyById(id:any){
    return this.http.get(environment.apiUrlProperty+id).pipe(tap(res => { res
    }),
    catchError(e => {        
      throw new Error(e);
    })
  );
  }

  propertyByP_Id(id:any){
    return this.http.get(environment.apiUrlPropertByP_id+id).pipe(tap(res => { res
    }),
    catchError(e => {        
      throw new Error(e);
    })
  );
  }


  quarters(){
    return this.http.get(environment.apiUrlQuarter).pipe(tap(res => { res
    }),
    catchError(e => {        
      throw new Error(e);
    })
  );
  }



  quarterById(id:any){
    return this.http.get(environment.apiUrlQuarter+id).pipe(tap(res => { res
    }),
    catchError(e => {        
      throw new Error(e);
    })
  );
  }

  quarterBy_Qid(id:any){
    return this.http.get(environment.apiUrlQuarter_Qid+id).pipe(tap(res => { res
    }),
    catchError(e => {        
      throw new Error(e);
    })
  );
  }

  bookedProperty(id:any){
    return this.http.get(environment.apiUrlUserBookedProperty+id).pipe(tap(res => { res
    }),
    catchError(e => {        
      throw new Error(e);
    })
  );
  }



  BookQuarter(id:any,data:any){
    return this.http.put(environment.apiUrlUpdateQuarter+id,data).pipe(tap(res => { res
    }),
    catchError(e => {        
      throw new Error(e);
    })
  );
  }

  propertyFlag(id:any,data:any){
    return this.http.put(environment.apiUrlUpdateProperty+id,data).pipe(tap(res => { res
    }),
    catchError(e => {        
      throw new Error(e);
    })
  );
  }

  projectFlag(id:any,data:any){
    return this.http.put(environment.apiUrlUpdateProject+id,data).pipe(tap(res => { res
    }),
    catchError(e => {        
      throw new Error(e);
    })
  );
  }

  ApplicationUpdate(id:any,data:any){
    return this.http.put(environment.apiUrlApplicationUpdate+id,data).pipe(tap(res => { res
    }),
    catchError(e => {        
      throw new Error(e);
    })
  );
  }

  ProperyAvailableUpdate(id:any,data:any){
    return this.http.put(environment.apiUrlPropertyAvailableUpdate+id,data).pipe(tap(res => { res
    }),
    catchError(e => {        
      throw new Error(e);
    })
  );
  }




   
}



