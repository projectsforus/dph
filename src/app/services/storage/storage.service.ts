import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  save(key: string, value) {
    return this.storage.set(key, value);
  }

  get(key: string) {
    return this.storage.get(key);
  }

  remove(key: string) {
    return this.storage.remove(key);
  }
}
