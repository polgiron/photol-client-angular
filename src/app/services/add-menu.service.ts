import { Injectable } from '@angular/core'
import { Subject, Observable } from 'rxjs'

@Injectable()
export class AddMenuService {
  private _closeAll: Subject<boolean> = new Subject<boolean>()

  constructor() {}

  public closeAllChannel(): Observable<boolean> {
    return this._closeAll.asObservable()
  }

  closeAll(): void {
    this._closeAll.next()
  }
}
