import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
//import { escape, unescape } from 'querystring';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async store(storageKey: string, value: any){
      const encryptedValue = btoa(encodeURIComponent(JSON.stringify(value)));
      await Preferences.set({
        key: storageKey,
        value:encryptedValue
      });
  }

  async get(storageKey: string) {
    const ret = await Preferences.get({ key: storageKey });
    if(ret.value){
      return JSON.parse(decodeURIComponent(atob(ret.value)));
    }else{
      return false;
    }
  }

  async removeItem(storageKey: string){
    await Preferences.remove({key: storageKey});
  }

  async clear(){
    await Preferences.clear();
  }
}
