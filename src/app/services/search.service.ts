import { Injectable } from '@angular/core'
import { Api } from './api.service'
import { Observable, BehaviorSubject } from 'rxjs'
import { Image } from '../models/image.model'

@Injectable()
export class SearchService {
  private _searchValue: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  )
  document: string = 'search/'

  constructor(private api: Api) {}

  searchValueChannel(): Observable<string> {
    return this._searchValue.asObservable()
  }

  setSearchValue(value: string) {
    this._searchValue.next(value)
  }

  async search(value: string): Promise<Image[]> {
    this.setSearchValue(value)
    return await this.api.get(this.document + value)
  }
}
