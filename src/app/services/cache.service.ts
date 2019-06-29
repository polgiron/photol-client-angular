import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {
  constructor() { }

  set(key: string, value: any) {
    console.log('caching');
    localStorage.setItem(key, value);
  }

  get(key: string) {
    console.log('getting cache');
    const value = localStorage.getItem(key);
    // console.log(JSON.parse(value));
    return value ? value : null;
  }
}
