import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class TopbarService {
  private _pageTitle: Subject<string> = new Subject<string>();

  constructor() { }

  public pageTitleChannel(): Observable<string> {
    return this._pageTitle.asObservable();
  }

  updatePageTitle(value: string) {
    this._pageTitle.next(value);
  }
}
