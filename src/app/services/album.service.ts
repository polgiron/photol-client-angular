import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AlbumService {
  private _albumTitle: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor() { }

  public albumTitleChannel(): Observable<string> {
    return this._albumTitle.asObservable();
  }

  setAlbumTitle(title: string) {
    this._albumTitle.next(title);
  }
}
