import { Injectable } from '@angular/core';
import { Api } from './api.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class SearchService {
  private _searchValue: BehaviorSubject<string> = new BehaviorSubject<string>('');
  document: string = 'search/';

  constructor(
    private api: Api
  ) { }

  searchValueChannel(): Observable<string> {
    return this._searchValue.asObservable();
  }

  setSearchValue(value: string) {
    this._searchValue.next(value);
  }

  async search(value: string) {
    // console.log('Search: ' + value);
    this.setSearchValue(value);
    const response: any = await this.api.get(this.document + value);
    return response.results;
  }
}
